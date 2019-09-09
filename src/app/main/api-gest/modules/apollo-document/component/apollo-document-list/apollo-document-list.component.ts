import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

@Component({
    templateUrl: './apollo-document-list.component.html',
    styleUrls: ['./apollo-document-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class AigApolloDocumentListComponent{
    constructor(
        private router: Router,
    ) { }
    
}
