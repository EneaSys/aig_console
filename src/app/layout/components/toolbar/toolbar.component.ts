import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, from, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { Md5 } from 'ts-md5/dist/md5';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { IContext, Context } from 'aig-common/context-browser-repository/Context.model';
import { AuthService } from 'auth/auth.service';
import { AigContextRepositoryService } from 'aig-common/context-browser-repository/context-browser-repository.service';

import { navigation } from 'app/navigation/navigation';
import { UserPermissionMemoryResourceService } from 'api-gest';
import { AigModuleNavigationService } from 'app/main/api-gest-console/navigation/navigation.service';



@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];

    isAuthenticated: boolean = false;
    loadedUserInfo: boolean = false;
    loggedUser: any;

    context: IContext;
    contexts: IContext[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private authService: AuthService,
        private aigContextRepositoryService: AigContextRepositoryService,
        private userPermissionMemoryResourceService: UserPermissionMemoryResourceService,
        private aigModuleNavigationService: AigModuleNavigationService,
    ) {
        this.languages = [
            {
                id: 'it',
                title: 'Italian',
                flag: 'it'
            },
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });

        this.authService.$authenticationState.subscribe(
            (isAuthenticated: boolean) => {
                this.authChange(isAuthenticated);
            }
        );

        this.afterOnInit();
    }

    async afterOnInit() {
        this.isAuthenticated = await this.authService.isAuthenticated();
        this.loadUserInfo();
        this.loadContextMenu();
    }

    private authChange(isAuthenticated: boolean) {
        this.isAuthenticated = isAuthenticated
        this.loadUserInfo();
        this.loadContextMenu();
    }

    private loadUserInfo() {
        if (this.isAuthenticated) {
            this.authService.getUser().then((user: any) => {
                this.loggedUserInfo(user)
            });   
        }
    }

    private loadContextMenu() {
        if (this.isAuthenticated) {
            this.aigContextRepositoryService.getCurrentContextObservable().subscribe(
                (context: IContext) => {
                    this.context = context;
                }
            );
            this.aigContextRepositoryService.getAvailableContextsObservable().subscribe(
                (value: IContext[]) => {
                    this.contexts = value;
                },
            );
        }
    }

    private loggedUserInfo(user: any) {
        if (user != undefined) {
            this.loggedUser = user;

            const md5 = new Md5();
            this.loggedUser.image = 'https://secure.gravatar.com/avatar/' + md5.appendStr(this.loggedUser.email).end();

            this.loadedUserInfo = true;
        } else {
            this.login();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    login() {
        this.authService.loginRedirect('/');
    }

    logout() {
        this.authService.logout('/');
    }

    setCurrentContext(context: IContext): void {
        this.aigContextRepositoryService.setCurrentContext(context);
    }

    reloadPermissions(): void {
        this.userPermissionMemoryResourceService.cleanUserPermission1()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            (value: any) => this.aigModuleNavigationService.reloadNavigation()
        );
    }
}
