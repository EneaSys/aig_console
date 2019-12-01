import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
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
export class EopooHeaderComponent implements OnInit {
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) { }

    @Input() sidebar: boolean;
    @Input() search: boolean;

    searchInput: FormControl;

    ngOnInit(){
        this.searchInput = new FormControl('');
    }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
