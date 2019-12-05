import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'aig-iam-header',
    templateUrl: './iam-header.component.html',
    styleUrls: ['./iam-header.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AigIamHeaderComponent implements OnInit {
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) { }

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
