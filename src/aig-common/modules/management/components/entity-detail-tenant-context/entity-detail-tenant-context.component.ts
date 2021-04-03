import { Component, Input, OnInit } from '@angular/core';

import {  TenantContextDTO } from 'api-gest';


@Component({
    selector: 'entity-detail-tenant-context',
    templateUrl: './entity-detail-tenant-context.component.html',
    styleUrls: ['./entity-detail-tenant-context.component.scss']
})
export class AigEntityDetailTenantContextComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    tenantContextDTO: TenantContextDTO;

}