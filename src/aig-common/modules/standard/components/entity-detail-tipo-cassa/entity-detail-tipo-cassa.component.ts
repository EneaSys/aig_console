import { Component, Input, OnInit } from '@angular/core';
import {IlFeCassaTipoDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-tipo-cassa',
    templateUrl: './entity-detail-tipo-cassa.component.html',
    styleUrls: ['./entity-detail-tipo-cassa.component.scss']
})
export class AigEntityDetailTipoCassaComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    tipoCassa: IlFeCassaTipoDTO;

}