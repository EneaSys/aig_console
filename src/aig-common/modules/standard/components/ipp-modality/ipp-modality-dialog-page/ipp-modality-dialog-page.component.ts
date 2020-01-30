import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-modality-dialog-page.component.html',
    styleUrls: ['./ipp-modality-dialog-page.component.scss']
})
export class AigIppModalityDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppModalityDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
