import { Component, Input, OnInit } from '@angular/core';
import { DettaglioLineaDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dettaglio-linea-detail-box',
    templateUrl: './dettaglio-linea-detail-box.component.html',
    styleUrls: ['./dettaglio-linea-detail-box.component.scss']
})
export class AgalDettaglioLineaDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    dettaglioLinea: DettaglioLineaDTO;
}