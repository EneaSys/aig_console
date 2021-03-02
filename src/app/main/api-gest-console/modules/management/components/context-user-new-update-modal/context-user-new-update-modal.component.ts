import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './context-user-new-update-modal.component.html',
    styleUrls: ['./context-user-new-update-modal.component.scss']
})
export class AigContextUserNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigContextUserNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}