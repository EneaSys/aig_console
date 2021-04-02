import { Component, Input, OnInit } from '@angular/core';

import { CityDTO } from 'aig-generic';
import { ItalianPublicProcurementLotCategoryDTO } from 'aig-standard';



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
    
    ippLotCategoryDTO: ItalianPublicProcurementLotCategoryDTO;

}