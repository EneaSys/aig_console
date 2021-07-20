import { Component, Input, OnInit } from '@angular/core';
import { EopooDTO } from 'aig-generic';

@Component({
    selector: 'aig-eopoo-entity-detail',
    templateUrl: './eopoo-entity-detail.component.html',
    styleUrls: ['./eopoo-entity-detail.component.scss']
})
export class AigEopooEntityDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    eopoo: EopooDTO;
}