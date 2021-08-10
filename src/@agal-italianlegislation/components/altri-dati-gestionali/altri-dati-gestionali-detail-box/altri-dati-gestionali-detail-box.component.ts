import { Component, Input, OnInit } from '@angular/core';
import { AltriDatiGestionaliDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-altri-dati-gestionali-detail-box',
    templateUrl: './altri-dati-gestionali-detail-box.component.html',
    styleUrls: ['./altri-dati-gestionali-detail-box.component.scss']
})
export class AgalAltriDatiGestionaliDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    altriDatiGestionali: AltriDatiGestionaliDTO;
}