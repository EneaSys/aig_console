import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './payment-new-update-modal.component.html',
    styleUrls: ['./payment-new-update-modal.component.scss']
})
export class AigPaymentNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPaymentNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
