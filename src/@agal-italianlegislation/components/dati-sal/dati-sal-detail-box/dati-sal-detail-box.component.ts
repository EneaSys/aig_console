import { Component, Input, OnInit } from '@angular/core';
import { DatiSalDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-sal-detail-box',
    templateUrl: './dati-sal-detail-box.component.html',
    styleUrls: ['./dati-sal-detail-box.component.scss']
})
export class AgalDatiSALDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiSal: DatiSalDTO;
}