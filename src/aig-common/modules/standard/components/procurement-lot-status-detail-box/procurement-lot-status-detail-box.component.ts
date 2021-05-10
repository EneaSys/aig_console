import { Component, Input, OnInit } from '@angular/core';
import {IlPpProcurementLotStatusDTO} from 'aig-standard';



@Component({
    selector: 'procurement-lot-status-detail-box',
    templateUrl: './procurement-lot-status-detail-box.component.html',
    styleUrls: ['./procurement-lot-status-detail-box.component.scss']
})
export class AigProcurementLotStatusDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    procurementLotStatus: IlPpProcurementLotStatusDTO
}