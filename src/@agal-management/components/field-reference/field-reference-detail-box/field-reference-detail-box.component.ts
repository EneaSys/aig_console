import { Component, Input, OnInit } from '@angular/core';
import { FieldReferenceDTO } from 'aig-management';

@Component({
    selector: 'agal-field-reference-detail-box',
    templateUrl: './field-reference-detail-box.component.html',
    styleUrls: ['./field-reference-detail-box.component.scss']
})
export class AgalFieldReferenceDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    fieldReference: FieldReferenceDTO;
}