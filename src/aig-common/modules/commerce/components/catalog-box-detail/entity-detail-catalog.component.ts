import { Component, Input, OnInit } from '@angular/core';
import { CatalogDTO, InventoryItemDTO } from 'aig-commerce';


@Component({
    selector: 'entity-detail-catalog',
    templateUrl: './entity-detail-catalog.component.html',
    styleUrls: ['./entity-detail-catalog.component.scss']
})
export class AigEntityDetailCatalogComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    catalogDTO: CatalogDTO;

}