import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'aig-apollo-document-line-list-table',
    templateUrl: './apollo-document-line-list.component.html',
    styleUrls: ['./apollo-document-line-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ApolloDocumentLineListTableComponent implements OnInit {
    constructor() { }

    @Input()
    dataSource: any[];

    @Input()
    displayedColumns: string[];

    ngOnInit(): void { }
}
