import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'aig-role-custom-new-dialog',
    templateUrl: './custom-role-new-dialog.component.html',
    styleUrls: ['./custom-role-new-dialog.component.scss']
})
export class AigRoleCustomNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRoleCustomNewDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
