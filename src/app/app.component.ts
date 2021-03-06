import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationItalian } from 'app/navigation/i18n/it';

import { locale as mainEnglish } from 'app/i18n/en';
import { locale as mainItalian } from 'app/i18n/it';

import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { AigContextRepositoryService } from 'aig-common/context-browser-repository/context-browser-repository.service';
import { EventService, EsEvent } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private router: Router,
        private eventService: EventService,
        private aigContextRepositoryService: AigContextRepositoryService,
        private location: Location,
    ) {
        // Add languages
        this._translateService.addLangs(['en', 'it']);

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(mainEnglish, mainItalian, navigationEnglish, navigationItalian);

        // Set the default language
        this._translateService.setDefaultLang('it');

        // Use a language
        this._translateService.use('it');

        setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.use('en');
        }, 1000);

        setTimeout(() => {
            this._translateService.setDefaultLang('it');
            this._translateService.use('it');
        }, 2000);

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

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
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });

        /*
         *  Esamina url per settare il contesto current
         *  Se il contesto nella url è null
         *      Se ha un contesto di default lo setta come current e reload con contesto nella url
         *      Se NON ha un contesto di default redirect alla pagina per settare contesto
         */
        this.aigContextRepositoryService.examineUrlAndGetCurrentContext();
        
        {
            this.router.events.pipe(
                filter((event: RouterEvent) => event instanceof NavigationEnd)
            ).subscribe(async (event: any) => {
                this.aigContextRepositoryService.examineUrlAndGetCurrentContext();

                if(event.url.includes('context=')) {
                    var esEvent: EsEvent = {
                        reason: "urlIsChanged"
                    }
                    this.eventService.reloadCurrentPage(esEvent);
                }
            });   
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
}
