import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './object-reference-new-update-dialog.component.html',
    styleUrls: ['./object-reference-new-update-dialog.component.scss']
})
export class AigObjectReferenceNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigObjectReferenceNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}