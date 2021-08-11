import { Component, Input, OnInit } from '@angular/core';
import { TypeCategoryReferenceDTO } from 'aig-management';

@Component({
    selector: 'agal-type-category-reference-detail-box',
    templateUrl: './type-category-reference-detail-box.component.html',
    styleUrls: ['./type-category-reference-detail-box.component.scss']
})
export class AgalTypeCategoryReferenceDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    typeCategoryReference: TypeCategoryReferenceDTO;
}