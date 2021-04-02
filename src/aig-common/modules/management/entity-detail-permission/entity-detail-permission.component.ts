import { Component, Input, OnInit } from '@angular/core';

import { ContextGroupDTO, PermissionDTO, RoleDTO } from 'api-gest';


@Component({
    selector: 'entity-detail-permission',
    templateUrl: './entity-detail-permission.component.html',
    styleUrls: ['./entity-detail-permission.component.scss']
})
export class AigEntityDetailPermissionComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    permissionDTO: PermissionDTO;

}