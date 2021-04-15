import { Component, Input, OnInit } from '@angular/core';
import { EopooTypeDTO } from 'aig-generic';

@Component({
    selector: 'aig-eopoo-type-entity-detail',
    templateUrl: './eopoo-type-entity-detail.component.html',
    styleUrls: ['./eopoo-type-entity-detail.component.scss']
})
export class AigEopooTypeEntityDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    eopooTypeDTO: EopooTypeDTO;
}