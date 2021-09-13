import { Component, Input, OnInit } from '@angular/core';
import { RoleDTO } from 'aig-management';

@Component({
    selector: 'agal-role-detail-box',
    templateUrl: './role-detail-box.component.html',
    styleUrls: ['./role-detail-box.component.scss']
})
export class AgalRoleDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    role: RoleDTO;
}