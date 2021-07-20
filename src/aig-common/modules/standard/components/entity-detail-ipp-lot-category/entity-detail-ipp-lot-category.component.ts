import { Component, Input, OnInit } from '@angular/core';
import { IlPpProcurementLotCategoryDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-ipp-lot-category',
    templateUrl: './entity-detail-ipp-lot-category.component.html',
    styleUrls: ['./entity-detail-ipp-lot-category.component.scss']
})
export class AigEntityDetailIppLotCategoryComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    ippLotCategory: IlPpProcurementLotCategoryDTO;

}