import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'fuse-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls  : ['./confirm-dialog.component.scss']
})
export class FuseConfirmNewUpdateModalComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmNewUpdateModalComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<FuseConfirmNewUpdateModalComponent>
    )
    {
    }

}
