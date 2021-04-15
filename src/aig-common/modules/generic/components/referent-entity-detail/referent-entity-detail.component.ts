import { Component, Input, OnInit } from '@angular/core';
import { ReferentDTO } from 'aig-generic';

@Component({
    selector: 'aig-referent-entity-detail',
    templateUrl: './referent-entity-detail.component.html',
    styleUrls: ['./referent-entity-detail.component.scss']
})
export class AigReferentEntityDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    referentDTO: ReferentDTO;
}