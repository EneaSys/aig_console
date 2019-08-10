import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'aig-eopoo-header',
    templateUrl: './eopoo-header.component.html',
    styleUrls: ['./eopoo-header.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EopooHeaderComponent {
    @Input() sidebar: boolean;
    @Input() search: boolean;

    searchInput: FormControl;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) {
        this.searchInput = new FormControl('');
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
