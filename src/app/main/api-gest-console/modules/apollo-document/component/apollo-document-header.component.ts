import { Component, ViewEncapsulation, Input } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'aig-apollo-document-header',
    templateUrl: './apollo-document-header.component.html',
    styleUrls: ['./apollo-document-header.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AigApolloDocumentHeaderComponent{
    @Input() sidebar: boolean;

    constructor(
        private _fuseSidebarService: FuseSidebarService,
    ) { }

    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
