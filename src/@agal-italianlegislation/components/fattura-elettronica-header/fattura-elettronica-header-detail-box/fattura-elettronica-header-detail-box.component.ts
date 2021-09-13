import { Component, Input, OnInit } from '@angular/core';
import { FatturaElettronicaHeaderDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-fattura-elettronica-header-detail-box',
    templateUrl: './fattura-elettronica-header-detail-box.component.html',
    styleUrls: ['./fattura-elettronica-header-detail-box.component.scss']
})
export class AgalFatturaElettronicaHeaderDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    fatturaElettronicaHeader: FatturaElettronicaHeaderDTO;
}