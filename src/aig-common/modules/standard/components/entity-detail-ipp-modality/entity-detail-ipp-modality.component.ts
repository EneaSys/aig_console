import { Component, Input, OnInit } from '@angular/core';
import { ItalianPublicProcurementModalityDTO } from 'aig-standard';





@Component({
    selector: 'entity-detail-ipp-modality',
    templateUrl: './entity-detail-ipp-modality.component.html',
    styleUrls: ['./entity-detail-ipp-modality.component.scss']
})
export class AigEntityDetailIppModalityComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    ippModalityDTO: ItalianPublicProcurementModalityDTO;

}