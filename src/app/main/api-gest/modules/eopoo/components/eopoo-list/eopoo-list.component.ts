import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';

@Component({
    templateUrl: './eopoo-list.component.html',
    styleUrls: ['./eopoo-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class EopooListComponent{
    constructor(
        private router: Router,
    ) { }

    newEopoo(){
        this.router.navigate(['eopoo', 'new']);
    }
}
