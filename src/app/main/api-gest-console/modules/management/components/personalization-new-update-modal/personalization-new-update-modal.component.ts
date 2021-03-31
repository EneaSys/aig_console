import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    templateUrl: './personalization-new-update-modal.component.html',
    styleUrls: ['./personalization-new-update-modal.component.scss']
})
export class AigPersonalizationNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigPersonalizationNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}