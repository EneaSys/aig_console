import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './validate-buyer-dialog.component.html',
    styleUrls: ['./validate-buyer-dialog.component.scss']
})
export class ValidateBuyerDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<ValidateBuyerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
