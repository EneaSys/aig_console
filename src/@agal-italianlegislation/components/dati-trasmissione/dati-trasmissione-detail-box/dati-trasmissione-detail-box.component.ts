import { Component, Input, OnInit } from '@angular/core';
import { DatiTrasmissioneDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-trasmissione-detail-box',
    templateUrl: './dati-trasmissione-detail-box.component.html',
    styleUrls: ['./dati-trasmissione-detail-box.component.scss']
})
export class AgalDatiTrasmissioneDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiTrasmissione: DatiTrasmissioneDTO;
}