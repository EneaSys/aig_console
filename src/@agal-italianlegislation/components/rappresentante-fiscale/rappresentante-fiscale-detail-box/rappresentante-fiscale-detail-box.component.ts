import { Component, Input, OnInit } from '@angular/core';
import { RappresentanteFiscaleDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-rappresentante-fiscale-detail-box',
    templateUrl: './rappresentante-fiscale-detail-box.component.html',
    styleUrls: ['./rappresentante-fiscale-detail-box.component.scss']
})
export class AgalRappresentanteFiscaleDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    rappresentanteFiscale: RappresentanteFiscaleDTO;
}