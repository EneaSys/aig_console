import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    templateUrl: './solidarity-request-new-dialog.component.html',
    styleUrls: ['./solidarity-request-new-dialog.component.scss']
})
export class AigSolidarityRequestNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSolidarityRequestNewDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
