import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './city-dialog-page.component.html',
    styleUrls: ['./city-dialog-page.component.scss']
})
export class AigCityDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCityDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
