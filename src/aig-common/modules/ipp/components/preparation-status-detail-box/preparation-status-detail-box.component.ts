import { Component, Input, OnInit } from '@angular/core';
import { PreparationStatusDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-preparation-status-detail-box',
    templateUrl: './preparation-status-detail-box.component.html',
    styleUrls: ['./preparation-status-detail-box.component.scss']
})
export class AigPreparationStatusDetailBoxComponent implements OnInit {
    @Input()
    preparationStatus: PreparationStatusDTO

    constructor() { }

    ngOnInit(): void { }
}