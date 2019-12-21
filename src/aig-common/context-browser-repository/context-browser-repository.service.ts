import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subscriber, from, Subject } from 'rxjs';

import { TenantContextResourceService, TenantContextDTO } from 'api-gest';
import { IContext } from './Context.model';

@Injectable()
export class AigContextRepositoryService {
    constructor(
        private localStorage: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private tenantContextResourceService: TenantContextResourceService,
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
                } else {
                    this._setCurrentContext(context);
                }
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
            if(currentContext != null) {
                this.currentContextObservable.next(currentContext);
            }
        }, 1);
        return this.currentContextObservable.asObservable();
    }

    async getCurrentContext(): Promise<IContext> {
        return this.currentContext;
    }
















    async examineUrlAndGetCurrentContext(): Promise<IContext> {
        if(this.isPageWithoutContext()) {
            return this.currentContext;
        }

        if (this.currentContext == null) {
            this.reloadWithDefaultContext();
            return this.getDefaultContextInMemory();
        }

        const contextCodeInQueryParam: string = await this.getContextCodeInQueryParam().toPromise();

        // Controlla se query params è vuoto
        if (contextCodeInQueryParam == null || contextCodeInQueryParam == "") {
            // ContextCodeInQueryParams vuoto ricarico con current
            return this.reloadWithCurrentContextOrDefault();
        }

        // Controlla se current (in query params) è uguale a current
        if (contextCodeInQueryParam != this.currentContext.contextCode) {
            var newCurrentContext: IContext = await this.loadValidContext(contextCodeInQueryParam);
            // contextCodeInQueryParam diverso da current
            this._setCurrentContext(newCurrentContext);
        }

        this.currentContextObservable.next(this.currentContext);
        return this.currentContext;
    }


    

























    private _setCurrentContext(context: IContext) {
        this.currentContext = context;

        this.addAvailableContextInMemory(context);
        this.reloadWithThisContext(context);
        this.currentContextObservable.next(context);
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
    private getContextByContextCodeFromBackend(contextCode: string) {
        return new Observable((observer: Subscriber<IContext>) => {
            this.tenantContextResourceService.getAllTenantContextsUsingGET(null, null, contextCode, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
            .subscribe(
                (TenantContextDTOs: TenantContextDTO[]) => {
                    var validContext: IContext = {
                        contextName: TenantContextDTOs[0].name,
                        contextCode: TenantContextDTOs[0].contextCode,
                    };
                    observer.next(validContext);
                    observer.complete();
                }
            );
        });
    }













    






















    // Memory
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

    private cleanInMemoryContext() {
        var inMemoryContexts: IContext[] = [];
        this.localStorage.store('aig-context-in-memory', inMemoryContexts);
    }













































    // Reload with context
    private reloadWithCurrentContextOrDefault() {
        if (this.currentContext != null) {
            this.reloadWithThisContext(this.currentContext);
            return this.currentContext;
        }
        return this.reloadWithDefaultContext();
    }

    private reloadWithDefaultContext() {
        var defaultContext = this.getDefaultContextInMemory();
        if (defaultContext == null) {
            this.router.navigate(['/m8t', 'context', 'list']);
            return null;
        }
        this._setCurrentContext(defaultContext);
        return defaultContext;
    }

    private reloadWithThisContext(context: IContext) {
        if(this.isPageWithoutContext()) {
            return;
        }
        var currentUrl = this.router.url;
        var currentUrlArray = currentUrl.split("?");
        if (currentUrlArray[0] != '/') {
            var queryParams = this.urlQueryStringToObjectParams(currentUrl);
            queryParams.context = context.contextCode;

            this.router.navigate([currentUrlArray[0]], { queryParams: queryParams });
        }
    }

    

















        // UTILS

        private isPageWithoutContext(): boolean {
            if(this.router.url.startsWith('/implicit/callback')) {
                return true;
            }
            if(this.router.url.startsWith('/m8t/context/list')) {
                return true;
            }
            return false;
        }
    
        private getContextCodeInQueryParam(): Observable<string> {
            return new Observable((observer: Subscriber<string>) => {
                this.route.queryParams.subscribe(params => {
                    observer.next(params['context']);
                    observer.complete();
                })
            });
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