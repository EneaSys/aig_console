import { Component, OnInit, Input } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';


@Component({
    selector: 'aig-ipp-header',
    templateUrl: './ipp-header.component.html',
    styleUrls: ['./ipp-header.component.scss']
})
export class AigIppHeaderComponent implements OnInit {
    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) { }

    @Input() sectionName: string;
    @Input() sidebar: string;
    
    activateSidebar: boolean = false;

    ngOnInit(): void {
        if(this.sidebar != null){
            this.activateSidebar = true;
        }
    }

    toggleSidebar(name: string): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
