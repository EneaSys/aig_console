import { Component, Input, OnInit } from '@angular/core';
import { RiferimentoNumeroLineaDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-riferimento-numero-linea-detail-box',
    templateUrl: './riferimento-numero-linea-detail-box.component.html',
    styleUrls: ['./riferimento-numero-linea-detail-box.component.scss']
})
export class AgalRiferimentoNumeroLineaDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    riferimentoNumeroLinea: RiferimentoNumeroLineaDTO;
}