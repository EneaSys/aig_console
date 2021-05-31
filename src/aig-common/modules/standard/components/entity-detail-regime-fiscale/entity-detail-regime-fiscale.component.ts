import { Component, Input, OnInit } from '@angular/core';
import { IlFeRegimeFiscaleDTO } from 'aig-standard';





@Component({
    selector: 'entity-detail-regime-fiscale',
    templateUrl: './entity-detail-regime-fiscale.component.html',
    styleUrls: ['./entity-detail-regime-fiscale.component.scss']
})
export class AigEntityDetailRegimeFiscaleComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    regimeFiscale: IlFeRegimeFiscaleDTO;

}