import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './modalita-pagamento-new-update-dialog.component.html',
    styleUrls: ['./modalita-pagamento-new-update-dialog.component.scss']
})
export class AigModalitaPagamentoNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigModalitaPagamentoNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    
   
    ngOnInit(): void {

     }
}