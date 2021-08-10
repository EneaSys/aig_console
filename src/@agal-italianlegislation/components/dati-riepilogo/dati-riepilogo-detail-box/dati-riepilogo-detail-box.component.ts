import { Component, Input, OnInit } from '@angular/core';
import { DatiRiepilogoDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-riepilogo-detail-box',
    templateUrl: './dati-riepilogo-detail-box.component.html',
    styleUrls: ['./dati-riepilogo-detail-box.component.scss']
})
export class AgalDatiRiepilogoDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiRiepilogo: DatiRiepilogoDTO;
}