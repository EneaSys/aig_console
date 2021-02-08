import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AigTenantContextNewUpdateFormComponent } from 'aig-common/modules/management/components/tenant-context-new-update-form/tenant-context-new-update-form.component';

@Component({
    templateUrl: './tenant-context-new-update-dialog.component.html',
    styleUrls: ['./tenant-context-new-update-dialog.component.scss']
})
export class AigTenantContextNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigTenantContextNewUpdateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
