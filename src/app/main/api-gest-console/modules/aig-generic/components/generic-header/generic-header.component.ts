import { Component, OnInit, Input } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'aig-generic-header',
    templateUrl: './generic-header.component.html',
    styleUrls: ['./generic-header.component.scss']
})
export class AigGenericHeaderComponent implements OnInit {
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) { }

    @Input() sectionName: string;
    @Input() search: boolean;
    @Input() sidebar: string;

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
