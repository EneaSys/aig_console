import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
    templateUrl: './entity-reference-new-update-modal.component.html',
    styleUrls: ['./entity-reference-new-update-modal.component.scss']
})
export class AigEntityReferenceNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEntityReferenceNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
