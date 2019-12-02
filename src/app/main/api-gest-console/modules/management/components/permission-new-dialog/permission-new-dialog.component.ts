import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './permission-new-dialog.component.html',
    styleUrls: ['./permission-new-dialog.component.scss']
})
export class AigPermissionNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPermissionNewDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
