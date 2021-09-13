import { Component, Input, OnInit } from '@angular/core';
import { DatiVeicoliDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-veicoli-detail-box',
    templateUrl: './dati-veicoli-detail-box.component.html',
    styleUrls: ['./dati-veicoli-detail-box.component.scss']
})
export class AgalDatiVeicoliDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiVeicoli: DatiVeicoliDTO;
}