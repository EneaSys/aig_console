import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './new-custom-buy-dialog.component.html',
    styleUrls: ['./new-custom-buy-dialog.component.scss']
})
export class AigNewCustomBuyDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigNewCustomBuyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
