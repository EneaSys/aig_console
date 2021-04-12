import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './tipo-sconto-maggioranza-new-update-dialog.component.html',
    styleUrls: ['./tipo-sconto-maggioranza-new-update-dialog.component.scss']
})
export class AigTipoScontMaggioranzaNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigTipoScontMaggioranzaNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}