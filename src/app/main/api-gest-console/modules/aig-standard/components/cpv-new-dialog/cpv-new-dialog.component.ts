import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './cpv-new-dialog.component.html',
    styleUrls: ['./cpv-new-dialog.component.scss']
})
export class AigCpvNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCpvNewDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
