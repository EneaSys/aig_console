import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './preparation-modality-new-update-dialog.component.html',
    styleUrls: ['./preparation-modality-new-update-dialog.component.scss']
})
export class AigPreparationModalityNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPreparationModalityNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}