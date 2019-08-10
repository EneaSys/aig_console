import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
    templateUrl: './eopoo-list.component.html',
    styleUrls: ['./eopoo-list.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EopooListComponent{
    constructor(
        private router: Router,
    ) { }

    newEopoo(){
        this.router.navigate(['/api-gest', 'eopoo', 'new']);
    }
}
