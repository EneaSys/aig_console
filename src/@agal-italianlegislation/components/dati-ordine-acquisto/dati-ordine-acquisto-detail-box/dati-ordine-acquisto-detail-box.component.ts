import { Component, Input, OnInit } from '@angular/core';
import { DatiOrdineAcquistoDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-ordine-acquisto-detail-box',
    templateUrl: './dati-ordine-acquisto-detail-box.component.html',
    styleUrls: ['./dati-ordine-acquisto-detail-box.component.scss']
})
export class AgalDatiOrdineAcquistoDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiOrdineAcquisto: DatiOrdineAcquistoDTO;
}