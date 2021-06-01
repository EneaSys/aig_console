import { Component, Input, OnInit } from '@angular/core';
import { IlPpPartecipationTypeDTO } from 'aig-standard';

@Component({
    selector: 'partecipation-type-detail-box',
    templateUrl: './partecipation-type-detail-box.component.html',
    styleUrls: ['./partecipation-type-detail-box.component.scss']
})
export class AigPartecipationTypeDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    partecipationType: IlPpPartecipationTypeDTO
}