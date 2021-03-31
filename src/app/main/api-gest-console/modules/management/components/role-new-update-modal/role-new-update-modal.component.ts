import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './role-new-update-modal.component.html',
    styleUrls: ['./role-new-update-modal.component.scss']
})
export class AigRoleNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRoleNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
