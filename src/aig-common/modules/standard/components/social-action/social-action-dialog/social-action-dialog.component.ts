import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './social-action-dialog.component.html',
    styleUrls: ['./social-action-dialog.component.scss']
})
export class AigSocialActionDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSocialActionDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
