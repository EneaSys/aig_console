import { Component, Input, OnInit } from '@angular/core';
import { ItalianPublicProcurementProcedureDTO } from 'aig-standard';





@Component({
    selector: 'entity-detail-ipp-procedure',
    templateUrl: './entity-detail-ipp-procedure.component.html',
    styleUrls: ['./entity-detail-ipp-procedure.component.scss']
})
export class AigEntityDetailIppProcedureComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    
    ippProcedure: ItalianPublicProcurementProcedureDTO;

}