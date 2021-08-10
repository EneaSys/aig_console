import { Component, Input, OnInit } from '@angular/core';
import { DatiGeneraliDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-generali-detail-box',
    templateUrl: './dati-generali-detail-box.component.html',
    styleUrls: ['./dati-generali-detail-box.component.scss']
})
export class AgalDatiGeneraliDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiGenerali: DatiGeneraliDTO;
}