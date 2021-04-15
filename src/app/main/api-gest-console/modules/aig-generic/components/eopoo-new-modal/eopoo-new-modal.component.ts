import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './eopoo-new-modal.component.html',
    styleUrls: ['./eopoo-new-modal.component.scss']
})
export class AigEopooNewModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEopooNewModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}