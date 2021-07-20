import { Component, Input, OnInit } from '@angular/core';
import {IlFeRitenutaTipoDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-tipo-ritenuta',
    templateUrl: './entity-detail-tipo-ritenuta.component.html',
    styleUrls: ['./entity-detail-tipo-ritenuta.component.scss']
})
export class AigEntityDetailTipoRitenutaComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    tipoRitenuta: IlFeRitenutaTipoDTO;

}