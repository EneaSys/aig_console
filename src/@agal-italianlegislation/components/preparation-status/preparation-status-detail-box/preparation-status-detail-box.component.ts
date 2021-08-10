import { Component, Input, OnInit } from '@angular/core';
import { PreparationStatusDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-preparation-status-detail-box',
    templateUrl: './preparation-status-detail-box.component.html',
    styleUrls: ['./preparation-status-detail-box.component.scss']
})
export class AgalPreparationStatusDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    preparationStatus: PreparationStatusDTO;
}