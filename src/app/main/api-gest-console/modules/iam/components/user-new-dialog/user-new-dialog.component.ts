import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'aig-user-new-dialog',
    templateUrl: './user-new-dialog.component.html',
    styleUrls: ['./user-new-dialog.component.scss']
})
export class AigUserNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigUserNewDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
