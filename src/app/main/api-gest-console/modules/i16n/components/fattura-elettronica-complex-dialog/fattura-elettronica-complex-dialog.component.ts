import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './fattura-elettronica-complex-dialog.component.html',
    styleUrls: ['./fattura-elettronica-complex-dialog.component.scss']
})
export class AigFatturaElettronicaComplexDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigFatturaElettronicaComplexDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
