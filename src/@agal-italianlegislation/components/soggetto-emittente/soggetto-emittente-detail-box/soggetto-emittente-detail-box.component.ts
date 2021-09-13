import { Component, Input, OnInit } from '@angular/core';
import { SoggettoEmittenteDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-soggetto-emittente-detail-box',
    templateUrl: './soggetto-emittente-detail-box.component.html',
    styleUrls: ['./soggetto-emittente-detail-box.component.scss']
})
export class AgalSoggettoEmittenteDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    soggettoEmittente: SoggettoEmittenteDTO;
}