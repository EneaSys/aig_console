import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ProcurementDTO } from 'aig-italianlegislation';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-procurement-detail-box',
    templateUrl: './procurement-detail-box.component.html',
    styleUrls: ['./procurement-detail-box.component.scss']
})
export class AigProcurementDetailBoxComponent extends AigIppCommonGenericComponent {
	@Input()
    procurement: ProcurementDTO;
	
	constructor(
		_fuseTranslationLoaderService: FuseTranslationLoaderService
	) { super(_fuseTranslationLoaderService); }
}