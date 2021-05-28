import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './tipo-sconto-maggiorazione-new-update-dialog.component.html',
    styleUrls: ['./tipo-sconto-maggiorazione-new-update-dialog.component.scss']
})
export class AigTipoScontoMaggiorazioneNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigTipoScontoMaggiorazioneNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}