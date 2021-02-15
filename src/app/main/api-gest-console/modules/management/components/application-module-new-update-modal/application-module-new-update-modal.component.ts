import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AigApplicationModuleNewUpdateFormComponent } from 'aig-common/modules/management/components/application-module-new-update-form/application-module-new-update-form.component';

@Component({
    templateUrl: './application-module-new-update-modal.component.html',
    styleUrls: ['./application-module-new-update-modal.component.scss']
})
export class AigApplicationModuleNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigApplicationModuleNewUpdateFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
