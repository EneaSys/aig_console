import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
    templateUrl: './application-module-new-update-modal.component.html',
    styleUrls: ['./application-module-new-update-modal.component.scss']
})
export class AigApplicationModuleNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigApplicationModuleNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { 
    }
}
