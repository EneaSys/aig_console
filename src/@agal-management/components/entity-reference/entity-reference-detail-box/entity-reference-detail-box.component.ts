import { Component, Input, OnInit } from '@angular/core';
import { EntityReferenceDTO } from 'aig-management';

@Component({
    selector: 'agal-entity-reference-detail-box',
    templateUrl: './entity-reference-detail-box.component.html',
    styleUrls: ['./entity-reference-detail-box.component.scss']
})
export class AgalEntityReferenceDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    entityReference: EntityReferenceDTO;
}