import { Component, Input, OnInit } from '@angular/core';
import {IlPpProcurementSectorDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-ipp-sector',
    templateUrl: './entity-detail-ipp-sector.component.html',
    styleUrls: ['./entity-detail-ipp-sector.component.scss']
})
export class AigEntityDetailIppSectorComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    ippSector: IlPpProcurementSectorDTO;

}