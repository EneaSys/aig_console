import { Component, Input, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { PartecipationDTO } from 'aig-italianlegislation';
import { AigIppCommonGenericComponent } from '../ipp-common-generic-component';

@Component({
    selector: 'aig-partecipation-detail-box',
    templateUrl: './partecipation-detail-box.component.html',
    styleUrls: ['./partecipation-detail-box.component.scss']
})
export class AigPartecipationDetailBoxComponent extends AigIppCommonGenericComponent implements OnInit {
    constructor(_fuseTranslationLoaderService: FuseTranslationLoaderService) { super(_fuseTranslationLoaderService); }
    ngOnInit(): void {}

    @Input()
    partecipation: PartecipationDTO;
}