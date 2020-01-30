import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './city-new-dialog.component.html',
    styleUrls: ['./city-new-dialog.component.scss']
})
export class AigCityNewDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCityNewDialogComponent>,
    ) { }

    ngOnInit(): void { }
}
