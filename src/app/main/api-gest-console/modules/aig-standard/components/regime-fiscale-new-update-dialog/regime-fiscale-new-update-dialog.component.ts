import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './regime-fiscale-new-update-dialog.component.html',
    styleUrls: ['./regime-fiscale-new-update-dialog.component.scss']
})
export class AigRegimeFiscaleNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRegimeFiscaleNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    
   
    ngOnInit(): void {

     }
}