import { Component, Input, OnInit } from '@angular/core';
import { InsurancePolicyStatusDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-insurance-policy-status-detail-box',
    templateUrl: './insurance-policy-status-detail-box.component.html',
    styleUrls: ['./insurance-policy-status-detail-box.component.scss']
})
export class AigInsurancePolicyStatusDetailBoxComponent implements OnInit {
    @Input()
    insurancePolicyStatus: InsurancePolicyStatusDTO

    constructor() { }

    ngOnInit(): void { }
}