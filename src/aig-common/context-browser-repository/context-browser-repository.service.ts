import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subscriber, from, Subject } from 'rxjs';

import { TenantContextResourceService, TenantContextDTO } from 'api-gest';
import { IContext } from './Context.model';

@Injectable()
export class AigContextRepositoryService {
    constructor(
        private localStorage: LocalStorageService,
        private router: Router,
        private location: Location,
        private tenantContextResourceService: TenantContextResourceService,
    ) { }

    private currentContextObservable: Subject<IContext> = new Subject<IContext>();
    private availableContextObservable: Subject<IContext[]> = new Subject<IContext[]>();

    private currentContext: IContext;



















    async setDefaultContext(context: IContext) {
        try {
            let secureContext: IContext = await this.loadValidContext(context.contextCode);
            this.setDefaultContextInMemory(secureContext);
            this._setCurrentContext(secureContext);
        } catch(e) { }
    }

    async setCurrentContext(context: IContext) {
        try {
            let secureContext: IContext = await this.loadValidContext(context.contextCode);
            this._setCurrentContext(secureContext);
        } catch(e) {
            this.reloadWithDefaultContext();
        }
    }




    getAvailableContextsObservable(): Observable<IContext[]> {
        setTimeout(() => {
            this.availableContextObservable.next(this.getAvailableContextsInMemory());
        }, 1);
        return this.availableContextObservable.asObservable();
    }

    getCurrentContextObservable(): Observable<IContext> {
        setTimeout(async () => {
            let currentContext = await this.getCurrentContext();
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
            return null;
        }

        let queryParams = this.getQueryParams();

        if (queryParams.context == null || queryParams.context == "") {
            // ContextCodeInQueryParams vuoto ricarico con current o default, altrimenti redirigo alla pagina di scelta del contesto
            return this.reloadWithCurrentContextOrDefault();
        }

        /*
         *  Se 
         *      Non è stato ancora settato current
         *  Oppure
         *      Il contextCode in queryParam NON è uguale a current (contextCodeInQueryParam diverso da current)
         */
        if (this.currentContext == null || queryParams.context != this.currentContext.contextCode) {
            // Lo prende da queryParam e lo setta come current (se valido)
            let newCurrentContext: IContext = await this.loadValidContext(queryParams.context);
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
        let inMemoryContexts: IContext[] = this.getAvailableContextsInMemory();
        if (inMemoryContexts != null) {
            let currentContext: IContext;
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
                    let validContext: IContext = {
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
        let inMemoryContexts: IContext[] = this.localStorage.retrieve('aig-context-in-memory');
        let isPresent: boolean = false;
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
        let inMemoryContexts: IContext[] = [];
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
        let defaultContext = this.getDefaultContextInMemory();
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
        //console.log("Ricarico con context: ", context);
        let queryParams = this.getQueryParams();
        
        if(queryParams != null) {
            queryParams.context = context.contextCode;

            let currentUrlArray = this.location.path().split("?");
            this.router.navigate([currentUrlArray[0]], { queryParams: queryParams });
        } else {
            console.warn("SITUAZIONE ASSURDA");
        }
    }

    

















        // UTILS

        private isPageWithoutContext(): boolean {
            if(this.location.path().startsWith('/implicit/callback')) {
                return true;
            }
            if(this.location.path().startsWith('/m8t/context/list')) {
                return true;
            }
            return false;
        }
    
        private getQueryParams(): any {
            return this.urlQueryStringToObjectParams(this.location.path());
        }

        private urlQueryStringToObjectParams(currentUrl: String): any {
            let queryParams: any = {};
    
            if(currentUrl == "/") {
                return null;
            }

            let currentUrlArray = currentUrl.split("?");
            let currentParamsString = currentUrlArray[1];
            if (currentParamsString != null && currentParamsString != "") {
                let currentParamsArray = currentParamsString.split("&");
    
                currentParamsArray.forEach((currentParam) => {
                    let currentParamArray = currentParam.split("=");
                    let key = currentParamArray[0];
                    let value = currentParamArray[1];
    
                    queryParams[key] = value;
                });
            }
    
            return queryParams;
        }





}