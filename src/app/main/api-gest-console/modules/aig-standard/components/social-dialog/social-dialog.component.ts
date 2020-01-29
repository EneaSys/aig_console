import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './social-dialog.component.html',
    styleUrls: ['./social-dialog.component.scss']
})
export class AigSocialDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigSocialDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
