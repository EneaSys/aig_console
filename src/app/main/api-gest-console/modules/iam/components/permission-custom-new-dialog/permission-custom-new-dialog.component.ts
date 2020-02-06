import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomRoleDTO } from 'api-gest';

@Component({
    selector: 'aig-permission-custom-new-dialog',
    templateUrl: './permission-custom-new-dialog.component.html',
    styleUrls: ['./permission-custom-new-dialog.component.scss']
})
export class AigPermissionCustomNewNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPermissionCustomNewNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public customRole: CustomRoleDTO,
    ) { }

    ngOnInit(): void { }
}
