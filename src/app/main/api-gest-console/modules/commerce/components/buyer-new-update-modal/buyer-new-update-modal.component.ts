import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    templateUrl: './buyer-new-update-modal.component.html',
    styleUrls: ['./buyer-new-update-modal.component.scss']
})
export class AigBuyerNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigBuyerNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}