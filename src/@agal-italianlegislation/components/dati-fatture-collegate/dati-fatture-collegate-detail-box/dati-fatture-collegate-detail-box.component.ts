import { Component, Input, OnInit } from '@angular/core';
import { DatiFattureCollegateDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-fatture-collegate-detail-box',
    templateUrl: './dati-fatture-collegate-detail-box.component.html',
    styleUrls: ['./dati-fatture-collegate-detail-box.component.scss']
})
export class AgalDatiFattureCollegateDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiFattureCollegate: DatiFattureCollegateDTO;
}