import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './warehouse-handling-new-update-modal.component.html',
    styleUrls: ['./warehouse-handling-new-update-modal.component.scss']
})
export class AigWarehouseHandlingNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigWarehouseHandlingNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
