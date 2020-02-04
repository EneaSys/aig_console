import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-procedure-dialog-page.component.html',
    styleUrls: ['./ipp-procedure-dialog-page.component.scss']
})
export class AigIppProcedureDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppProcedureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
