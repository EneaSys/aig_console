import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './permission-new-update-modal.component.html',
    styleUrls: ['./permission-new-update-modal.component.scss']
})
export class AigPermissionNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPermissionNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
