import { Component, Input, OnInit } from '@angular/core';
import { InsurancePolicyDTO } from 'aig-italianlegislation';

@Component({
    selector: 'aig-insurance-policy-detail-box',
    templateUrl: './insurance-policy-detail-box.component.html',
    styleUrls: ['./insurance-policy-detail-box.component.scss']
})
export class AigInsurancePolicyDetailBoxComponent implements OnInit {
    @Input()
    insurancePolicy: InsurancePolicyDTO

    constructor() { }

    ngOnInit(): void { }
}
