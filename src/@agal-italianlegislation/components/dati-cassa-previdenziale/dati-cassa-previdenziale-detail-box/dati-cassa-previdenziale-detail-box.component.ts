import { Component, Input, OnInit } from '@angular/core';
import { DatiCassaPrevidenzialeDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-cassa-previdenziale-detail-box',
    templateUrl: './dati-cassa-previdenziale-detail-box.component.html',
    styleUrls: ['./dati-cassa-previdenziale-detail-box.component.scss']
})
export class AgalDatiCassaPrevidenzialeDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiCassaPrevidenziale: DatiCassaPrevidenzialeDTO;
}