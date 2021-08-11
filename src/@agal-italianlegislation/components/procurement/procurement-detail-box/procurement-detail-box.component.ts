import { Component, Input, OnInit } from '@angular/core';
import { ProcurementDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-procurement-detail-box',
    templateUrl: './procurement-detail-box.component.html',
    styleUrls: ['./procurement-detail-box.component.scss']
})
export class AgalProcurementDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    procurement: ProcurementDTO;
}