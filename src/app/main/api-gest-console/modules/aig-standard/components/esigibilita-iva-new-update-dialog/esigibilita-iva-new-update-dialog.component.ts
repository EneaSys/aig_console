import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './esigibilita-iva-new-update-dialog.component.html',
    styleUrls: ['./esigibilita-iva-new-update-dialog.component.scss']
})
export class AigEsigibilitaIvaNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEsigibilitaIvaNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}