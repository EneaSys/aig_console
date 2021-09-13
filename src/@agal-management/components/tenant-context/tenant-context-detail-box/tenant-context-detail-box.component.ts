import { Component, Input, OnInit } from '@angular/core';
import { TenantContextDTO } from 'aig-management';

@Component({
    selector: 'agal-tenant-context-detail-box',
    templateUrl: './tenant-context-detail-box.component.html',
    styleUrls: ['./tenant-context-detail-box.component.scss']
})
export class AgalTenantContextDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    tenantContext: TenantContextDTO;
}