import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'aig-context-user-new-update-dialog',
    templateUrl: './context-user-new-update-dialog.component.html',
    styleUrls: ['./context-user-new-update-dialog.component.scss']
})
export class AigContextUserNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigContextUserNewUpdateDialogComponent>,
		@Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
