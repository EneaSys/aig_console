import { Component, Input, OnInit } from '@angular/core';
import { LicenzeDTO } from 'aig-management';

@Component({
    selector: 'agal-licenze-detail-box',
    templateUrl: './licenze-detail-box.component.html',
    styleUrls: ['./licenze-detail-box.component.scss']
})
export class AgalLicenzeDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    licenze: LicenzeDTO;
}