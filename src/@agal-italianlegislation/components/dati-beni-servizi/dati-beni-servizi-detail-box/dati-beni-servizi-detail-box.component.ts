import { Component, Input, OnInit } from '@angular/core';
import { DatiBeniServiziDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-dati-beni-servizi-detail-box',
    templateUrl: './dati-beni-servizi-detail-box.component.html',
    styleUrls: ['./dati-beni-servizi-detail-box.component.scss']
})
export class AgalDatiBeniServiziDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiBeniServizi: DatiBeniServiziDTO;
}