import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'quick-panel',
    templateUrl  : './quick-panel.component.html',
    styleUrls    : ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent
{
    date: Date;
    settings: any;

    /**
     * Constructor
     */
    constructor()
    {
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud : false,
            retro : true
        };
    }
}
