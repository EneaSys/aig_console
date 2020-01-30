import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-sector-dialog-page.component.html',
    styleUrls: ['./ipp-sector-dialog-page.component.scss']
})
export class AigIppSectorDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppSectorDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
