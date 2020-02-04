import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-modality-dialog-page.component.html',
    styleUrls: ['./ipp-modality-dialog-page.component.scss']
})
export class AigIppModalityDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppModalityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
