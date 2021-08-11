import { Component, Input, OnInit } from '@angular/core';
import { FatturaPrincipaleDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-fattura-principale-detail-box',
    templateUrl: './fattura-principale-detail-box.component.html',
    styleUrls: ['./fattura-principale-detail-box.component.scss']
})
export class AgalFatturaPrincipaleDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    fatturaPrincipale: FatturaPrincipaleDTO;
}