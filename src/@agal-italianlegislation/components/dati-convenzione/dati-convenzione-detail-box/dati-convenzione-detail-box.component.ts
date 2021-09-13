import { Component, Input, OnInit } from '@angular/core';
import { DatiConvenzioneDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-convenzione-detail-box',
    templateUrl: './dati-convenzione-detail-box.component.html',
    styleUrls: ['./dati-convenzione-detail-box.component.scss']
})
export class AgalDatiConvenzioneDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiConvenzione: DatiConvenzioneDTO;
}