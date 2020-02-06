import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-procedure-new-update-modal.component.html',
    styleUrls: ['./ipp-procedure-new-update-modal.component.scss']
})
export class AigIppProcedureNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppProcedureNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
