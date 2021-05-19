import { Component, Input, OnInit } from '@angular/core';
import { PreparationDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-preparation-detail-box',
    templateUrl: './preparation-detail-box.component.html',
    styleUrls: ['./preparation-detail-box.component.scss']
})
export class AigPreparationDetailBoxComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {}

    @Input()
    preparation: PreparationDTO;
}