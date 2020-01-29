import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './social-dialog.component.html',
    styleUrls: ['./social-dialog.component.scss']
})
export class AigSocialDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSocialDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { 
        console.log(this.data);
    }
}
