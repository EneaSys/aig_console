import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './form-data-new-update-dialog.component.html',
    styleUrls: ['./form-data-new-update-dialog.component.scss']
})
export class AigFormDataNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigFormDataNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
