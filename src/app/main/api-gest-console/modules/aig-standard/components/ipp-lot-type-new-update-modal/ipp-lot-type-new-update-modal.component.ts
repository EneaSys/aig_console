import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-lot-type-new-update-modal.component.html',
    styleUrls: ['./ipp-lot-type-new-update-modal.component.scss']
})
export class AigIppLotTypeNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppLotTypeNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
