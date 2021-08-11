import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";


@Component({
    templateUrl: './user-licence-new-update-dialog.component.html',
    styleUrls: ['./user-licence-new-update-dialog.component.scss']
})
export class AigUserLicenceNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigUserLicenceNewUpdateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { }
}
