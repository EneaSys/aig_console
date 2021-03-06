import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './preparation-new-update-dialog.component.html',
    styleUrls: ['./preparation-new-update-dialog.component.scss']
})
export class AigPreparationNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPreparationNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    
   
    ngOnInit(): void {

     }
}