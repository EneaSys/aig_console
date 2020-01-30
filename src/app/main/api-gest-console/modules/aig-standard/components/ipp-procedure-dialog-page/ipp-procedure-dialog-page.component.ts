import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-procedure-dialog-page.component.html',
    styleUrls: ['./ipp-procedure-dialog-page.component.scss']
})
export class AigIppProcedureDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppProcedureDialogComponent>,
    ) { }

    ngOnInit(): void { 
    }
}
