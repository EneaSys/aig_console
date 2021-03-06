import { Component, Input, OnInit } from '@angular/core';
import { IlPpProcurementStatusDTO } from 'aig-standard';

@Component({
    selector: 'procurement-status-detail-box',
    templateUrl: './procurement-status-detail-box.component.html',
    styleUrls: ['./procurement-status-detail-box.component.scss']
})
export class AigProcurementStatusDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    procurementStatus: IlPpProcurementStatusDTO 
}