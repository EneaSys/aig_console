import { Component, Input, OnInit } from '@angular/core';
import { DesignatedCompanyDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-designated-company-detail-box',
    templateUrl: './designated-company-detail-box.component.html',
    styleUrls: ['./designated-company-detail-box.component.scss']
})
export class AgalDesignatedCompanyDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    designatedCompany: DesignatedCompanyDTO;
}