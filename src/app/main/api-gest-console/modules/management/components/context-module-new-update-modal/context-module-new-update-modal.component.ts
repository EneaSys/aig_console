import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './context-module-new-update-modal.component.html',
    styleUrls: ['./context-module-new-update-modal.component.scss']
})
export class AigContextModuleNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigContextModuleNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void { 
    }
}

