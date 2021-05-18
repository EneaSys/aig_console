import { Component, Input, OnInit } from '@angular/core';
import { PartecipationDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-partecipation-detail-box',
    templateUrl: './partecipation-detail-box.component.html',
    styleUrls: ['./partecipation-detail-box.component.scss']
})
export class AigPartecipationDetailBoxComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {}

    @Input()
    partecipation: PartecipationDTO;
}