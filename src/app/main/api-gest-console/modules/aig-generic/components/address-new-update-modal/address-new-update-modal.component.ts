import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './address-new-update-modal.component.html',
    styleUrls: ['./address-new-update-modal.component.scss']
})
export class AigAddressNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigAddressNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}
