import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subscriber, from, Subscription } from 'rxjs';

import { IContext } from './Context.model';
import { CurrentUserService, ResponseMyContexts } from 'api-gest';

@Injectable()
export class AigContextRepositoryService {
    constructor(
        private localStorage: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router,
        private currentUserService: CurrentUserService
    ) { }

    async getCurrentContext() {
        // Se non c'è un default context
        if (this.getDefaultContext() == null) {
            if(this.isSelectContextPage()){
                return new Observable((observer: Subscriber<IContext>) => {
                    observer.next({
                        contextName: "",
                        contextCode: "select-context"
                    });
                    observer.complete();
                }).toPromise();
            } else {
                this.router.navigate(["m8t", "context", "list"]);
                return;
            }
        }
        const contextCodeInQueryParam: string = await this.getContextCodeInQueryParam().toPromise();
        return this.examine(contextCodeInQueryParam).toPromise();
    }

    private getContextCodeInQueryParam(): Observable<string> {
        return new Observable((observer: Subscriber<string>) => {
            this.route.queryParams.subscribe(params => {
                observer.next(params['context']);
                observer.complete();
            })
        });
    }

    private examine(contextCodeInQueryParam: string): Observable<IContext> {
        return new Observable((observer: Subscriber<IContext>) => {
            // Controlla se query params è vuoto
            if (contextCodeInQueryParam == null || contextCodeInQueryParam == "") {
                //contextCodeInQueryParams vuoto lo metto
                this.reloadWithDefaultContext();
            } else {
                // Controlla se default è current in query params
                if (this.getDefaultContext().contextCode != contextCodeInQueryParam) {
                    //contextCodeInQueryParams diverso da default
                    return this.currentContextNotIsDefault(contextCodeInQueryParam);
                }
            }
            observer.next(this.getDefaultContext());
            observer.complete();
        });
    }



    private currentContextNotIsDefault(contextCodeInQueryParam: string): Subscription {
        var currentContext: IContext;

        //Controllo se è presente in quelli alternativi
        var inMemoryContexts: IContext[] = this.getInMemoryContexts();
        if (inMemoryContexts != null) {
            inMemoryContexts.forEach(function (context: IContext) {
                if (context.contextCode == contextCodeInQueryParam) {
                    currentContext = context;
                }
            });
        }

        // Se è uno dei alternativi lo retituisco
        if (currentContext != null) {
            //"Lo tengo in memoria"
            return new Observable((observer: Subscriber<IContext>) => {
                observer.next(currentContext);
                observer.complete();
            }).subscribe();
        }
        else {
            return new Observable((observer: Subscriber<IContext>) => {
                // Non è uno degli alternativi vede se è valido
                this.chekValidContext(contextCodeInQueryParam).subscribe((context: IContext) => {
                    if (context != null) {
                        // salvalo in alternativi
                        this.setInMemoryContext(context);
                        // Ritorno il context
                        observer.next(context);
                        observer.complete();
                    } else {
                        console.debug("Non valido ricarico");
                        this.reloadWithDefaultContext();
                    }
                });
            }).subscribe();
        }

    }

    private chekValidContext(contextCodeInQueryParam: String) {
        return new Observable((observer: Subscriber<IContext>) => {
            this.currentUserService.getMyContexts().subscribe(
                (contexts: ResponseMyContexts[]) => {
                    var validContext: ResponseMyContexts = null;
                    contexts.forEach(context => {
                        if(context.contextCode == contextCodeInQueryParam){
                            validContext = context;
                        }
                    });
                    observer.next(validContext);
                    observer.complete();
                }
            );
        });
    }

    private cleanInMemoryContext() {
        var inMemoryContexts: IContext[] = [];
        this.localStorage.store('aig-context-in-memory', inMemoryContexts);
    }

    private setInMemoryContext(context: IContext) {
        var inMemoryContexts: IContext[] = this.localStorage.retrieve('aig-context-in-memory');
        var isPresent: boolean = false;
        if (inMemoryContexts == null) {
            inMemoryContexts = [];
        } else {
            inMemoryContexts.forEach(contextInMemory => {
                if(contextInMemory.contextCode == context.contextCode){
                    isPresent = true;
                }
            });
        }
        if(!isPresent){
            inMemoryContexts.push(context);
            this.localStorage.store('aig-context-in-memory', inMemoryContexts);
        }
    }

    public getInMemoryContexts(): IContext[] {
        return this.localStorage.retrieve('aig-context-in-memory');
    }

    public setDefaultContext(context: IContext) {
        this.chekValidContext(context.contextCode).subscribe((context: IContext) => {
            if(context != null){
                this.localStorage.store('aig-default-context', context);
                this.reloadWithThisContext(context);
                this.setInMemoryContext(context);
            }
        })
    }

    private getDefaultContext(): IContext {
        return this.localStorage.retrieve('aig-default-context');
    }

    public setCurrentContext(context: IContext) {
        this.reloadWithThisContext(context);
        this.chekValidContext(context.contextCode).subscribe((context: IContext) => {
            if(context == null){
                this.reloadWithDefaultContext();
            }
        })
    }

    // UTILS

    private isSelectContextPage(){
        var currentUrl = this.router.url;
        var currentUrlArray = currentUrl.split("?");

        if(currentUrlArray[0] == "/m8t/context/list"){
            return true;
        }
        return false;
    }

    private reloadWithDefaultContext() {
        this.reloadWithThisContext(this.getDefaultContext());
    }

    private reloadWithThisContext(context: IContext) {
        var currentUrl = this.router.url;
        var currentUrlArray = currentUrl.split("?");
        if(currentUrlArray[0] != '/'){
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