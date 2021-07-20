import { Component, Input, OnInit } from '@angular/core';
import {IlFeCessionePrestazioneTipoDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-tipo-cessione-prestazione',
    templateUrl: './entity-detail-tipo-cessione-prestazione.component.html',
    styleUrls: ['./entity-detail-tipo-cessione-prestazione.component.scss']
})
export class AigEntityDetailTipoCessionePrestazioneComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    tipoCessionePrestazione: IlFeCessionePrestazioneTipoDTO;

}