import { Component, Input, OnInit } from '@angular/core';
import { PreparationModalityDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-preparation-modality-detail-box',
    templateUrl: './preparation-modality-detail-box.component.html',
    styleUrls: ['./preparation-modality-detail-box.component.scss']
})
export class AgalPreparationModalityDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    preparationModality: PreparationModalityDTO;
}