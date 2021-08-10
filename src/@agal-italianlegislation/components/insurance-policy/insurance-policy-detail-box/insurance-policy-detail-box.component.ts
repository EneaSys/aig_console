import { Component, Input, OnInit } from '@angular/core';
import { InsurancePolicyDTO } from 'aig-italianlegislation';

@Component({
    selector: 'agal-insurance-policy-detail-box',
    templateUrl: './insurance-policy-detail-box.component.html',
    styleUrls: ['./insurance-policy-detail-box.component.scss']
})
export class AgalInsurancePolicyDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    insurancePolicy: InsurancePolicyDTO;
}