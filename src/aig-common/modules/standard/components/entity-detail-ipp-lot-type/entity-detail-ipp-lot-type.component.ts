import { Component, Input, OnInit } from '@angular/core';
import { IlPpProcurementLotTypeDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-ipp-lot-type',
    templateUrl: './entity-detail-ipp-lot-type.component.html',
    styleUrls: ['./entity-detail-ipp-lot-type.component.scss']
})
export class AigEntityDetailIppLotTypeComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    ippLotType: IlPpProcurementLotTypeDTO;

}