import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './transaction-new-dialog.component.html',
    styleUrls: ['./transaction-new-dialog.component.scss']
})
export class AigTransactionNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigTransactionNewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}