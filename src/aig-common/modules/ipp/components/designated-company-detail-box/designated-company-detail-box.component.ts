import { Component, Input, OnInit } from '@angular/core';
import { DesignatedCompanyDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-designated-company-detail-box',
    templateUrl: './designated-company-detail-box.component.html',
    styleUrls: ['./designated-company-detail-box.component.scss']
})
export class AigDesignatedCompanyDetailBoxComponent implements OnInit {
    @Input()
    designatedCompany: DesignatedCompanyDTO

    constructor() { }

    ngOnInit(): void { }
}
