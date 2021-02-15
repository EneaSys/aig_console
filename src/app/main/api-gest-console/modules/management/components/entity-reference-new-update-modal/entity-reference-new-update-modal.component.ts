import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AigEntityReferenceNewUpdateFormComponent } from "aig-common/modules/management/components/entity-reference-new-update-form/entity-reference-new-update-form.component";

@Component({
    templateUrl: './entity-reference-new-update-modal.component.html',
    styleUrls: ['./entity-reference-new-update-modal.component.scss']
})
export class AigEntityReferenceNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEntityReferenceNewUpdateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
