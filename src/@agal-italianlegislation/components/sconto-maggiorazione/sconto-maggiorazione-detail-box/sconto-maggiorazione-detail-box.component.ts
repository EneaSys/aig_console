import { Component, Input, OnInit } from '@angular/core';
import { ScontoMaggiorazioneDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-sconto-maggiorazione-detail-box',
    templateUrl: './sconto-maggiorazione-detail-box.component.html',
    styleUrls: ['./sconto-maggiorazione-detail-box.component.scss']
})
export class AgalScontoMaggiorazioneDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    scontoMaggiorazione: ScontoMaggiorazioneDTO;
}