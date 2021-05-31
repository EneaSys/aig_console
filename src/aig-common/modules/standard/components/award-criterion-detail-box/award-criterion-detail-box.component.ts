import { Component, Input, OnInit } from '@angular/core';

import { CityDTO } from 'aig-generic';
import { IlPpProcurementLotAwardCriterionDTO } from 'aig-standard';



@Component({
    selector: 'award-criterion-detail-box',
    templateUrl: './award-criterion-detail-box.component.html',
    styleUrls: ['./award-criterion-detail-box.component.scss']
})
export class AigAwardCriterionDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    awardCriterion: IlPpProcurementLotAwardCriterionDTO;

}