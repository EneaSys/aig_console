import { Component, OnInit } from '@angular/core';
import { RoleDTO } from 'api-gest';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './role-system-detail.component.html',
    styleUrls: ['./role-system-detail.component.scss']
})
export class AigRoleSystemDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute
    ) { }

    roleSystem: RoleDTO;
    permissionSystemDisplayedColumns: string[] = ['id', 'name', 'permissionCode', 'moduleName'];

    ngOnInit(): void {
        this.roleSystem = this.route.snapshot.data.roleSystem;
    }
}
