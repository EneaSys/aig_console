import { Component, Input, OnInit } from '@angular/core';
import { ApplicationModuleDTO } from 'aig-management';

@Component({
    selector: 'agal-application-module-detail-box',
    templateUrl: './application-module-detail-box.component.html',
    styleUrls: ['./application-module-detail-box.component.scss']
})
export class AgalApplicationModuleDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    applicationModule: ApplicationModuleDTO;
}