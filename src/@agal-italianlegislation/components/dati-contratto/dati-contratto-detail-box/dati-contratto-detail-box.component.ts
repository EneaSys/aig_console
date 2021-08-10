import { Component, Input, OnInit } from '@angular/core';
import { DatiContrattoDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-contratto-detail-box',
    templateUrl: './dati-contratto-detail-box.component.html',
    styleUrls: ['./dati-contratto-detail-box.component.scss']
})
export class AgalDatiContrattoDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiContratto: DatiContrattoDTO;
}