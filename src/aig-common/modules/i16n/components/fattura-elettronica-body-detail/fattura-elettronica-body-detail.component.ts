import { Component, Input, OnInit } from '@angular/core';
import { FatturaElettronicaBodyDTO } from 'aig-italianlegislation';


@Component({
    selector: 'aig-fattura-elettronica-body-detail',
    templateUrl: './fattura-elettronica-body-detail.component.html',
    styleUrls: ['./fattura-elettronica-body-detail.component.scss']
})
export class AigFatturaElettronicaBodyDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    fatturaElettronicaBody: FatturaElettronicaBodyDTO;

}