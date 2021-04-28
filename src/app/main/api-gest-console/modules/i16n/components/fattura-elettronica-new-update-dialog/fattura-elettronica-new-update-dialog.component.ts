import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './fattura-elettronica-new-update-dialog.component.html',
    styleUrls: ['./fattura-elettronica-new-update-dialog.component.scss']
})
export class AigFatturaElettronicaNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigFatturaElettronicaNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}