import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './fiscal-transaction-new-update-modal.component.html',
    styleUrls: ['./fiscal-transaction-new-update-modal.component.scss']
})
export class AigFiscalTransactionNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigFiscalTransactionNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}

