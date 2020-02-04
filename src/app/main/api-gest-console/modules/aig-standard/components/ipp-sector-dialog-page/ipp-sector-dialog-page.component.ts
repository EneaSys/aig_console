import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-sector-dialog-page.component.html',
    styleUrls: ['./ipp-sector-dialog-page.component.scss']
})
export class AigIppSectorDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppSectorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
