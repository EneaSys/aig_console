import { Component, Input, OnInit } from '@angular/core';
import { ProcurementLotDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-procurement-lot-detail-box',
    templateUrl: './procurement-lot-detail-box.component.html',
    styleUrls: ['./procurement-lot-detail-box.component.scss']
})
export class AigProcurementLotDetailBoxComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {}

    @Input()
    procurementLot: ProcurementLotDTO;
}