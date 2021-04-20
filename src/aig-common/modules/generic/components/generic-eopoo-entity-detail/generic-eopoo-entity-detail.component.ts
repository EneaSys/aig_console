import { Component, Input, OnInit } from '@angular/core';
import { GenericEopooDTO } from 'aig-generic';

@Component({
    selector: 'aig-generic-eopoo-entity-detail',
    templateUrl: './generic-eopoo-entity-detail.component.html',
    styleUrls: ['./generic-eopoo-entity-detail.component.scss']
})
export class AigGenericEopooEntityDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    genericEopooDTO: GenericEopooDTO;
}