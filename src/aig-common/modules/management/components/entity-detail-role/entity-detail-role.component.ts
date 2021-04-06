import { Component, Input, OnInit } from '@angular/core';

import { ContextGroupDTO, RoleDTO } from 'api-gest';


@Component({
    selector: 'entity-detail-role',
    templateUrl: './entity-detail-role.component.html',
    styleUrls: ['./entity-detail-role.component.scss']
})
export class AigEntityDetailRoleComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    roleDTO: RoleDTO;

}