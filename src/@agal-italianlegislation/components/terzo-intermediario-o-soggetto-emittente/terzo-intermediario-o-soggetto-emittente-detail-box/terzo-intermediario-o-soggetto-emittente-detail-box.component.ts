import { Component, Input, OnInit } from '@angular/core';
import { TerzoIntermediarioOSoggettoEmittenteDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-terzo-intermediario-o-soggetto-emittente-detail-box',
    templateUrl: './terzo-intermediario-o-soggetto-emittente-detail-box.component.html',
    styleUrls: ['./terzo-intermediario-o-soggetto-emittente-detail-box.component.scss']
})
export class AgalTerzoIntermediarioOSoggettoEmittenteDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    terzoIntermediarioOSoggettoEmittente: TerzoIntermediarioOSoggettoEmittenteDTO;
}