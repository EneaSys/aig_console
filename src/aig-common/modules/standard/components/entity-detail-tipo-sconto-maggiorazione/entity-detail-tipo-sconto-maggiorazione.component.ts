import { Component, Input, OnInit } from '@angular/core';
import {IlFeScontoMaggiorazioneTipoDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-tipo-sconto-maggiorazione',
    templateUrl: './entity-detail-tipo-sconto-maggiorazione.component.html',
    styleUrls: ['./entity-detail-tipo-sconto-maggiorazione.component.scss']
})
export class AigEntityDetailTipoScontoMaggiorazioneComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    tipoScontoMaggiorazione: IlFeScontoMaggiorazioneTipoDTO;

}