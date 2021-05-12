import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './tipo-cessione-prestazione-new-update-dialog.component.html',
    styleUrls: ['./tipo-cessione-prestazione-new-update-dialog.component.scss']
})
export class AigTipoCessionePrestazioneNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigTipoCessionePrestazioneNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}