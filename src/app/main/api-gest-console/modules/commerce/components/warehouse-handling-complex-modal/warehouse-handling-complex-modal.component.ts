import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './warehouse-handling-complex-modal.component.html',
    styleUrls: ['./warehouse-handling-complex-modal.component.scss']
})
export class AigWarehouseHandlingComplexModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigWarehouseHandlingComplexModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
