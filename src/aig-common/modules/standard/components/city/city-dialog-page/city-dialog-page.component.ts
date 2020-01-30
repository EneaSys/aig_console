import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './city-dialog-page.component.html',
    styleUrls: ['./city-dialog-page.component.scss']
})
export class AigCityDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCityDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
