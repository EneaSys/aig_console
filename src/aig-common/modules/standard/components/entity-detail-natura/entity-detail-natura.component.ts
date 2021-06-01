import { Component, Input, OnInit } from '@angular/core';
import { IlFeNaturaDTO } from 'aig-standard';

@Component({
    selector: 'entity-detail-natura',
    templateUrl: './entity-detail-natura.component.html',
    styleUrls: ['./entity-detail-natura.component.scss']
})
export class AigEntityDetailNaturaComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    natura: IlFeNaturaDTO;

}