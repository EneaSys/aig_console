import { Component, OnInit } from '@angular/core';
import { CustomRoleResourceService, CustomRoleDTO, RoleResourceService, RoleDTO } from 'api-gest';
import { MatDialog } from '@angular/material/dialog';
import { AigRoleCustomNewDialogComponent } from '../role-new-dialog/role-new-dialog.component';

@Component({
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class AigRoleListComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private roleResourceService : RoleResourceService,
        private customRoleResourceService: CustomRoleResourceService,
    ) { }

    roleSystemDisplayedColumns: string[] = ['id', 'name', 'roleCode', 'buttons'];
    roleSystemDataSource: any[];

    roleCustomDisplayedColumns: string[] = ['id', 'name', 'buttons'];
    roleCustomDataSource: any[];

    ngOnInit(): void {
        this.roleResourceService.getAllRolesUsingGET().subscribe(
            (value: RoleDTO[]) => {
                this.roleSystemDataSource = value;
            }
        );
        this.customRoleResourceService.getAllCustomRolesUsingGET({}).subscribe(
            (value: CustomRoleDTO[]) => {
                this.roleCustomDataSource = value;
            }
        );
    }

    newCustomRole(){
        this.dialog.open(AigRoleCustomNewDialogComponent);
    }
}
