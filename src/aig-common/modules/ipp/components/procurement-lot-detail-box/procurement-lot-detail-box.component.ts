import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ProcurementLotDTO } from 'aig-italianlegislation';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-procurement-lot-detail-box',
    templateUrl: './procurement-lot-detail-box.component.html',
    styleUrls: ['./procurement-lot-detail-box.component.scss']
})
export class AigProcurementLotDetailBoxComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    procurementLot: any; //TODO CAMBIARE IN ProcurementLotDTO
}