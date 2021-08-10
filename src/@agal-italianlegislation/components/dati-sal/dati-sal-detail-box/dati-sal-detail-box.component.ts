import { Component, Input, OnInit } from '@angular/core';
import { DatiSALDTO } from 'aig-italianlegislation';

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
    datiSal: DatiSALDTO;
}