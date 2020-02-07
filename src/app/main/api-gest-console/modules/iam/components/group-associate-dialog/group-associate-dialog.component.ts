import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './group-associate-dialog.component.html',
    styleUrls: ['./group-associate-dialog.component.scss']
})
export class AigGroupAssociateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigGroupAssociateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
