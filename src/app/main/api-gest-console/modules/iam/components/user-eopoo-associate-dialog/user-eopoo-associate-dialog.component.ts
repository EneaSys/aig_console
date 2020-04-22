import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './user-eopoo-associate-dialog.component.html',
    styleUrls: ['./user-eopoo-associate-dialog.component.scss']
})
export class AiguserEopooAssociateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AiguserEopooAssociateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
