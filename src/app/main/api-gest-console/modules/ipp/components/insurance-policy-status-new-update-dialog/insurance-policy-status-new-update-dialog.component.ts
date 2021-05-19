import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './insurance-policy-status-new-update-dialog.component.html',
    styleUrls: ['./insurance-policy-status-new-update-dialog.component.scss']
})
export class AigInsurancePolicyStatusNewUpdateDialogComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigInsurancePolicyStatusNewUpdateDialogComponent>,
        @Inject (MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void { }
}