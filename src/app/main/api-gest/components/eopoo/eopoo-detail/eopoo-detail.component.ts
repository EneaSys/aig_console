import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DefaultService, EopooCreationRequest } from '../../../test';

@Component({
    templateUrl: './eopoo-detail.component.html',
    styleUrls: ['./eopoo-detail.component.scss']
})
export class EopooDetailComponent implements OnInit {
    id: number;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
    }

    
}
