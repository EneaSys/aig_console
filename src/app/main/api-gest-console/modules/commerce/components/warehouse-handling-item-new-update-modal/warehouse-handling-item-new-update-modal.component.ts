import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './warehouse-handling-item-new-update-modal.component.html',
    styleUrls: ['./warehouse-handling-item-new-update-modal.component.scss']
})
export class AigWarehouseHandlingItemNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigWarehouseHandlingItemNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
