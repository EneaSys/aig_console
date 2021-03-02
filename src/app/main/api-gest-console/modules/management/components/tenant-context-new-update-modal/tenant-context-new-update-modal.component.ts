import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    templateUrl: './tenant-context-new-update-modal.component.html',
    styleUrls: ['./tenant-context-new-update-modal.component.scss']
})
export class AigTenantContextNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigTenantContextNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
