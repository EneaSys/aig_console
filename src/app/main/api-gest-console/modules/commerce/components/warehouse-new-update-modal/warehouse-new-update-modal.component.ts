import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './warehouse-new-update-modal.component.html',
    styleUrls: ['./warehouse-new-update-modal.component.scss']
})
export class AigWarehouseNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigWarehouseNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
