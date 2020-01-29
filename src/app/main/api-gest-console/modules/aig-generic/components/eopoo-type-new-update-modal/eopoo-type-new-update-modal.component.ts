import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './eopoo-type-new-update-modal.component.html',
    styleUrls: ['./eopoo-type-new-update-modal.component.scss']
})
export class AigEopooTypeNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEopooTypeNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
