import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './social-action-new-update-modal.component.html',
    styleUrls: ['./social-action-new-update-modal.component.scss']
})
export class AigSocialActionNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSocialActionNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
