import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './cpv-new-update-dialog.component.html',
    styleUrls: ['./cpv-new-update-dialog.component.scss']
})
export class AigCpvNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCpvNewUpdateDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
