import { Component, Input, OnInit } from '@angular/core';
import { UserLicenzeDTO } from 'aig-management';

@Component({
    selector: 'agal-user-licenze-detail-box',
    templateUrl: './user-licenze-detail-box.component.html',
    styleUrls: ['./user-licenze-detail-box.component.scss']
})
export class AgalUserLicenzeDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    userLicenze: UserLicenzeDTO;
}