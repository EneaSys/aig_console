import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './social-new-update-modal.component.html',
    styleUrls: ['./social-new-update-modal.component.scss']
})
export class AigSocialNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSocialNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
