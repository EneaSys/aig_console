import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './city-new-update-modal.component.html',
    styleUrls: ['./city-new-update-modal.component.scss']
})
export class AigCityNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigCityNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
