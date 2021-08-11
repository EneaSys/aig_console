import { Component, Input, OnInit } from '@angular/core';
import { IndirizzoResaDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-indirizzo-resa-detail-box',
    templateUrl: './indirizzo-resa-detail-box.component.html',
    styleUrls: ['./indirizzo-resa-detail-box.component.scss']
})
export class AgalIndirizzoResaDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    indirizzoResa: IndirizzoResaDTO;
}