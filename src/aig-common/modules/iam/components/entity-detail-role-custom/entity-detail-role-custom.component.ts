import { Component, Input, OnInit } from '@angular/core';

import { ContextGroupDTO, CustomRoleDTO } from 'api-gest';


@Component({
    selector: 'entity-detail-role-custom',
    templateUrl: './entity-detail-role-custom.component.html',
    styleUrls: ['./entity-detail-role-custom.component.scss']
})
export class AigEntityDetailRoleCustomComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    customRole: CustomRoleDTO;

}