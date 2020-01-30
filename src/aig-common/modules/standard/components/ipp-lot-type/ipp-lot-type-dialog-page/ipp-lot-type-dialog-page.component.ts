import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-lot-type-dialog-page.component.html',
    styleUrls: ['./ipp-lot-type-dialog-page.component.scss']
})
export class AigIppLotTypeDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppLotTypeDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
