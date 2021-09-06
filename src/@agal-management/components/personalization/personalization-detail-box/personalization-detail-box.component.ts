import { Component, Input, OnInit } from '@angular/core';
import { PersonalizationDTO } from 'aig-management';

@Component({
    selector: 'agal-personalization-detail-box',
    templateUrl: './personalization-detail-box.component.html',
    styleUrls: ['./personalization-detail-box.component.scss']
})
export class AgalPersonalizationDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    personalization: PersonalizationDTO;
}