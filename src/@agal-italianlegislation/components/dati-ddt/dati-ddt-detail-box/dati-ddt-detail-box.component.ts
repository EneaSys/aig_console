import { Component, Input, OnInit } from '@angular/core';
import { DatiDdtDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-ddt-detail-box',
    templateUrl: './dati-ddt-detail-box.component.html',
    styleUrls: ['./dati-ddt-detail-box.component.scss']
})
export class AgalDatiDDTDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiDdt: DatiDdtDTO;
}