import { Component, Input, OnInit } from '@angular/core';
import { IlFeEsigibilitaIvaDTO, IlPpProcurementLotCategoryDTO } from 'aig-standard';



@Component({
    selector: 'entity-detail-esigibilita-iva',
    templateUrl: './entity-detail-esigibilita-iva.component.html',
    styleUrls: ['./entity-detail-esigibilita-iva.component.scss']
})
export class AigEntityDetailEsigibilitaIvaComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    esigibilitaIva: IlFeEsigibilitaIvaDTO;

}