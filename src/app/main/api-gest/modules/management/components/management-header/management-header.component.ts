import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'aig-management-header',
    templateUrl: './management-header.component.html',
    styleUrls: ['./management-header.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AigManagementHeaderComponent implements OnInit {
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) { }

    @Input() search: boolean;
    @Input() sidebar: string;
    @Input() sectionName: string;

    searchInput: FormControl;
    activateSidebar: boolean;

    ngOnInit(): void {
        this.searchInput = new FormControl('');
        this.activateSidebar = false;
        if(this.sidebar != null){
            this.activateSidebar = true;
        }
    }

    toggleSidebar(name: string): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
