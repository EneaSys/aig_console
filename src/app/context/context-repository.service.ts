import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subscriber, from, Subscription, Subject } from 'rxjs';

import { IContext } from './Context.model';
import { CurrentUserService, ResponseMyContexts } from 'api-gest';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class AigContextRepositoryService {
    constructor(
        private localStorage: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private currentUserService: CurrentUserService,
        private authService: AuthService,
    ) { }

    private currentContextObservable: Subject<IContext> = new Subject<IContext>();
    private availableContextObservable: Subject<IContext[]> = new Subject<IContext[]>();

    private currentContext: IContext;



















    setDefaultContext(context: IContext) {
        this.getContextByContextCodeFromBackend(context.contextCode).subscribe((context: IContext) => {
            if (context != null) {
                this.setDefaultContextInMemory(context);
                this._setCurrentContext(context);
            }
        })
    }

    setCurrentContext(context: IContext) {
        from(this.loadValidContext(context.contextCode)).subscribe(
            (value: IContext) => {
                if (value == null) {
                    this.reloadWithDefaultContext();
                }
                this._setCurrentContext(context);
            }
        );
    }

    getAvailableContexts(): Observable<IContext[]> {
        setTimeout(() => {
            this.availableContextObservable.next(this.getAvailableContextsInMemory());
        }, 1);
        return this.availableContextObservable.asObservable();
    }

    getCurrentContextObservable(): Observable<IContext> {
        setTimeout(async () => {
            var currentContext = await this.getCurrentContext();
            this.currentContextObservable.next(currentContext);
        }, 1);
        return this.currentContextObservable.asObservable();
    }



    async getCurrentContext() {
        const contextCodeInQueryParam: string = await this.getContextCodeInQueryParam().toPromise();
        const defaultContext = this.getDefaultContextInMemory();

        // Controlla se query params è vuoto
        if (contextCodeInQueryParam == null || contextCodeInQueryParam == "") {
            // ContextCodeInQueryParams vuoto ricarico con current
            this.reloadWithCurrentContext();
            return this.currentContext;
        }

        // Controlla se current (in query params) è uguale a default
        if (contextCodeInQueryParam != defaultContext.contextCode) {
            // Current diverso da default
            var currentContext: IContext = await this.loadValidContext(contextCodeInQueryParam);
            if (currentContext == null) {
                this.reloadWithDefaultContext();
                return defaultContext;
            }
            this._setCurrentContext(currentContext);
            return currentContext;
        }

        // Current è uguale a default
        return defaultContext;
    }

    private getContextCodeInQueryParam(): Observable<string> {
        return new Observable((observer: Subscriber<string>) => {
            this.route.queryParams.subscribe(params => {
                observer.next(params['context']);
                observer.complete();
            })
        });
    }




    private _setCurrentContext(context: IContext) {
        this.currentContext = context;

        this.addAvailableContextInMemory(context);
        this.currentContextObservable.next(context);
        this.reloadWithThisContext(context);
    }











    private async loadValidContext(contextCode: string) {
        //Controllo se è presente in quelli alternativi
        var inMemoryContexts: IContext[] = this.getAvailableContextsInMemory();
        if (inMemoryContexts != null) {
            var currentContext: IContext;
            inMemoryContexts.forEach((context: IContext) => {
                if (context.contextCode == contextCode) {
                    // Se è uno dei alternativi lo setto come currentContext
                    currentContext = context;
                }
            });
            if (currentContext != null) {
                return currentContext;
            }
        }

        // Non è uno degli alternativi

        // Prendo contesto da backend
        return await this.getContextByContextCodeFromBackend(contextCode).toPromise();
    }














    private getContextByContextCodeFromBackend(contextCode: String) {
        return new Observable((observer: Subscriber<IContext>) => {
            this.currentUserService.getMyContexts().subscribe(
                (contexts: ResponseMyContexts[]) => {
                    var validContext: ResponseMyContexts = null;
                    contexts.forEach(context => {
                        if (context.contextCode == contextCode) {
                            validContext = context;
                        }
                    });
                    observer.next(validContext);
                    observer.complete();
                }
            );
        });
    }






















    private addAvailableContextInMemory(context: IContext) {
        var inMemoryContexts: IContext[] = this.localStorage.retrieve('aig-context-in-memory');
        var isPresent: boolean = false;
        if (inMemoryContexts == null) {
            inMemoryContexts = [];
        } else {
            inMemoryContexts.forEach(contextInMemory => {
                if (contextInMemory.contextCode == context.contextCode) {
                    isPresent = true;
                }
            });
        }
        if (!isPresent) {
            inMemoryContexts.push(context);
            this.localStorage.store('aig-context-in-memory', inMemoryContexts);
        }
        this.availableContextObservable.next(inMemoryContexts);
    }
    private getAvailableContextsInMemory(): IContext[] {
        return this.localStorage.retrieve('aig-context-in-memory');
    }





    private setDefaultContextInMemory(context: IContext) {
        this.localStorage.store('aig-default-context', context);
    }

    private getDefaultContextInMemory(): IContext {
        return this.localStorage.retrieve('aig-default-context');
    }




















    // UTILS

    private cleanInMemoryContext() {
        var inMemoryContexts: IContext[] = [];
        this.localStorage.store('aig-context-in-memory', inMemoryContexts);
    }

    private isSelectContextPage() {
        var currentUrl = this.router.url;
        var currentUrlArray = currentUrl.split("?");

        if (currentUrlArray[0] == "/m8t/context/list") {
            return true;
        }
        return false;
    }

    private isSelectLoginPage() {
        var currentUrl = this.router.url;
        var currentUrlArray = currentUrl.split("#");

        console.log(currentUrl, currentUrlArray);

        alert("stop");
        if (currentUrlArray[0] == "/implicit/callback") {
            return true;
        }
        return false;
    }



































    private reloadWithCurrentContext() {
        if (this.currentContext != null) {
            this.reloadWithThisContext(this.currentContext);
            return;
        }
        this.reloadWithDefaultContext();
        return;
    }

    private reloadWithDefaultContext() {
        console.log("Obbliga utente alla scelta del context");
        this.router.navigate(['/m8t', 'context', 'list']);
        this.reloadWithThisContext(this.getDefaultContextInMemory());
    }

    private reloadWithThisContext(context: IContext) {
        var currentUrl = this.router.url;
        var currentUrlArray = currentUrl.split("?");
        if (currentUrlArray[0] != '/') {
            var queryParams = this.urlQueryStringToObjectParams(currentUrl);
            queryParams.context = context.contextCode;

            this.router.navigate([currentUrlArray[0]], { queryParams: queryParams });
        }
    }

    private urlQueryStringToObjectParams(currentUrl: String) {
        var queryParams: any = {};

        var currentUrlArray = currentUrl.split("?");
        var currentParamsString = currentUrlArray[1];
        if (currentParamsString != null && currentParamsString != "") {
            var currentParamsArray = currentParamsString.split("&");

            currentParamsArray.forEach(function (value) {
                var currentParameterArray = value.split("=");
                var key = currentParameterArray[0];
                var value = currentParameterArray[1];

                queryParams[key] = value;
            });
        }

        return queryParams;
    }











}