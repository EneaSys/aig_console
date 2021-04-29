import { Component, Input, OnInit } from '@angular/core';
import { DatiVeicoliDTO } from 'aig-italianlegislation';


@Component({
    selector: 'aig-dati-veicoli-detail',
    templateUrl: './dati-veicoli-detail.component.html',
    styleUrls: ['./dati-veicoli-detail.component.scss']
})
export class AigDatiVeicoliDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    datiVeicoli: DatiVeicoliDTO;

}