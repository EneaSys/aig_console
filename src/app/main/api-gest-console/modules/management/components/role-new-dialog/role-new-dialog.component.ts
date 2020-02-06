import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './role-new-dialog.component.html',
    styleUrls: ['./role-new-dialog.component.scss']
})
export class AigRoleNewNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigRoleNewNewUpdateModalComponent>,
    ) { }

    ngOnInit(): void { }
}
