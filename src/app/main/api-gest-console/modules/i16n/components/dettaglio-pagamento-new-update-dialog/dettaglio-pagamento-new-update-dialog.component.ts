import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './dettaglio-pagamento-new-update-dialog.component.html',
    styleUrls: ['./dettaglio-pagamento-new-update-dialog.component.scss']
})
export class AigDettaglioPagamentoNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigDettaglioPagamentoNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}