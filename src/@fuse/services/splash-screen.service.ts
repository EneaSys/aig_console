import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

import { filter, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FuseSplashScreenService {
    splashScreenEl: any;
    player: AnimationPlayer;
    private _visible: boolean;

    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param _document
     * @param {Router} _router
     */
    constructor(
        private _animationBuilder: AnimationBuilder,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router
    ) {
        // Initialize
        this._init();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void {
        // Get the splash screen element
        this.splashScreenEl = this._document.body.querySelector('#fuse-splash-screen');

        // If the splash screen element exists...
        if (this.splashScreenEl) {
            this._visible = true;
            // Hide it on the first NavigationEnd event
            /**
            this._router.events
                .pipe(
                    filter((event => event instanceof NavigationEnd)),
                    take(1)
                )
                .subscribe(() => {
                    setTimeout(() => {
                        this.hide();
                    });
                });
             */
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(): void {
        if (!this._visible) {
            this.player =
                this._animationBuilder
                    .build([
                        style({
                            opacity: '0',
                            zIndex: '99999'
                        }),
                        animate('400ms ease', style({ opacity: '1' }))
                    ]).create(this.splashScreenEl);

            setTimeout(() => {
                this.player.play();
                this._visible = true;
            }, 0);
        }
    }

    /**
     * Hide the splash screen
     */
    hide(): void {
        if (this._visible) {
            this.player =
                this._animationBuilder
                    .build([
                        style({ opacity: '1' }),
                        animate('400ms ease', style({
                            opacity: '0',
                            zIndex: '-10'
                        }))
                    ]).create(this.splashScreenEl);

            setTimeout(() => {
                this.player.play();
                this._visible = false;
            }, 0);
        }
    }

    visible(): boolean {
        if (this._visible) {
            return true;
        }
        return false;
    }
}
