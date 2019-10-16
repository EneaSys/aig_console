import { Injectable } from '@angular/core';
import { Observable, from, Subscriber, empty } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AigContextRepositoryService } from 'app/context/context-repository.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private aigContextRepositoryService: AigContextRepositoryService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return new Observable((observer: Subscriber<HttpEvent<any>>) => {
            from(this.prepareHeader(request)).subscribe((request: HttpRequest<any>) => {
                if(request == null){
                    return Observable.create(empty);
                }
                next.handle(request).subscribe((event)=>{
                    observer.next(event);
                });
            })
        });
    }

    private async prepareHeader(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        const tokenPromise = this.authService.getAccessToken();
        const contextCodePromise = this.aigContextRepositoryService.getCurrentContext();
        
        let res = await Promise.all([tokenPromise, contextCodePromise]);
        let token = res[0];
        let contextCode = res[1];

        if(contextCode == null){
            return null;
        }

        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + token,
                'X-Tenant-Code': contextCode.contextCode,
            }
        });

        return request;
    }
}
