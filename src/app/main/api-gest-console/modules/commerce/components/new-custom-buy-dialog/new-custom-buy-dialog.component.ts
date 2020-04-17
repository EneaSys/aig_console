import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './new-custom-buy-dialog.component.html',
    styleUrls: ['./new-custom-buy-dialog.component.scss']
})
export class AigNewCustomBuyDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigNewCustomBuyDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
