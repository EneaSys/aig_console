import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './permission-new-dialog.component.html',
    styleUrls: ['./permission-new-dialog.component.scss']
})
export class AigPermissionNewNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPermissionNewNewUpdateModalComponent>,
    ) { }

    ngOnInit(): void { }
}
