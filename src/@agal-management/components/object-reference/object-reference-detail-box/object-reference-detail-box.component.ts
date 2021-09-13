import { Component, Input, OnInit } from '@angular/core';
import { ObjectReferenceDTO } from 'aig-management';

@Component({
    selector: 'agal-object-reference-detail-box',
    templateUrl: './object-reference-detail-box.component.html',
    styleUrls: ['./object-reference-detail-box.component.scss']
})
export class AgalObjectReferenceDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    objectReference: ObjectReferenceDTO;
}