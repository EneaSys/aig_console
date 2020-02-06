import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-modality-new-update-modal.component.html',
    styleUrls: ['./ipp-modality-new-update-modal.component.scss']
})
export class AigIppModalityNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppModalityNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
