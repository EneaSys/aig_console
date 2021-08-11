import { Component, Input, OnInit } from '@angular/core';
import { DatiRitenutaDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-ritenuta-detail-box',
    templateUrl: './dati-ritenuta-detail-box.component.html',
    styleUrls: ['./dati-ritenuta-detail-box.component.scss']
})
export class AgalDatiRitenutaDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiRitenuta: DatiRitenutaDTO;
}