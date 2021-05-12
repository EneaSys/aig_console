import { Component, Input, OnInit } from '@angular/core';

import { CityDTO } from 'aig-generic';
import { IlPpPartecipationTypeDTO, IlPpProcurementLotAwardCriterionDTO } from 'aig-standard';



@Component({
    selector: 'partecipation-type-detail-box',
    templateUrl: './partecipation-type-detail-box.component.html',
    styleUrls: ['./partecipation-type-detail-box.component.scss']
})
export class AigPartecipationTypeDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    partecipationType: IlPpPartecipationTypeDTO
}