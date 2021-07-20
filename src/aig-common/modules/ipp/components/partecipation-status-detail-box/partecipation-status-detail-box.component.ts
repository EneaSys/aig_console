import { Component, Input, OnInit } from '@angular/core';
import { PartecipationStatusDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-partecipation-status-detail-box',
    templateUrl: './partecipation-status-detail-box.component.html',
    styleUrls: ['./partecipation-status-detail-box.component.scss']
})
export class AigPartecipationStatusDetailBoxComponent implements OnInit {
    @Input()
    partecipationStatus: PartecipationStatusDTO

    constructor() { }

    ngOnInit(): void { }
}