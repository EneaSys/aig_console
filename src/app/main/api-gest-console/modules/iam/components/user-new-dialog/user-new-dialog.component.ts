import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'aig-user-new-dialog',
    templateUrl: './user-new-dialog.component.html',
    styleUrls: ['./user-new-dialog.component.scss']
})
export class AigUserNewNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigUserNewNewUpdateModalComponent>,
    ) { }

    ngOnInit(): void { }
}
