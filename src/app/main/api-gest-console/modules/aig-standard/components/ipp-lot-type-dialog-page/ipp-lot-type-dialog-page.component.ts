import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-lot-type-dialog-page.component.html',
    styleUrls: ['./ipp-lot-type-dialog-page.component.scss']
})
export class AigIppLotTypeDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppLotTypeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
