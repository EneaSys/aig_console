import { Component, Input, OnInit } from '@angular/core';
import { DatiBolloDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-bollo-detail-box',
    templateUrl: './dati-bollo-detail-box.component.html',
    styleUrls: ['./dati-bollo-detail-box.component.scss']
})
export class AgalDatiBolloDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiBollo: DatiBolloDTO;
}