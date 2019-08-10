import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.getAccessToken())
            .pipe(
                switchMap(token => {
                    request = request.clone({
                        setHeaders: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    return next.handle(request);
                })
            );
    }
}
