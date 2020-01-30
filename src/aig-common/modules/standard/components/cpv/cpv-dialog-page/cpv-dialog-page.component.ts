import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './cpv-dialog-page.component.html',
    styleUrls: ['./cpv-dialog-page.component.scss']
})
export class AigCpvDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCpvDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
