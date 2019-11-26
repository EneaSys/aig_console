import { Injectable } from '@angular/core';
import { Observable, from, Subscriber, empty } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AigContextRepositoryService } from 'app/context/context-repository.service';
import { API_URL } from 'app/app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private aigContextRepositoryService: AigContextRepositoryService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.prepareHeader(request)).pipe(
            switchMap(request => {
                return next.handle(request);
            })
        );
    }

    private async prepareHeader(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        if (request.url.startsWith(API_URL)) {
            if(request.url.startsWith(API_URL + "/my/")) {
                return this.prepareHeaderAuthorized(request);
            }
            if(request.url.startsWith(API_URL + "/m8t/")) {
                return this.prepareHeaderAuthorized(request);
            }
            return this.prepareHeaderWithContext(request);
        }
        else {
            return request;
        }
    }

    private async prepareHeaderAuthorized(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        const tokenPromise = this.authService.getAccessToken();

        let res = await Promise.all([tokenPromise]);
        let token = res[0];

        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + token,
            }
        });

        return request;
    }

    private async prepareHeaderWithContext(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        const tokenPromise = this.authService.getAccessToken();
        const contextCodePromise = this.aigContextRepositoryService.getCurrentContext();

        let res = await Promise.all([tokenPromise, contextCodePromise]);
        let token = res[0];
        let context = res[1];

        if (context == null || token == null) {
            console.log("BHO");
            return request;
        }

        request = request.clone({
            setHeaders: {
                'Authorization': 'Bearer ' + token,
                'X-Tenant-Code': context.contextCode,
            }
        });

        return request;
    }
}
