import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './cpv-dialog-page.component.html',
    styleUrls: ['./cpv-dialog-page.component.scss']
})
export class AigCpvDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCpvDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
