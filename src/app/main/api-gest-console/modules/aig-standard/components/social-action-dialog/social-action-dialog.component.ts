import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './social-action-dialog.component.html',
    styleUrls: ['./social-action-dialog.component.scss']
})
export class AigSocialActionDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSocialActionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
