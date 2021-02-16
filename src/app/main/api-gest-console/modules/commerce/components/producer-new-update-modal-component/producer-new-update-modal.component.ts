import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './producer-new-update-modal.component.html',
    styleUrls: ['./producer-new-update-modal.component.scss']
})
export class AigProducerNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigProducerNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
