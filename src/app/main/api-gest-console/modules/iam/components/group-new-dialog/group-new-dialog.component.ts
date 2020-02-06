import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'aig-group-new-dialog',
    templateUrl: './group-new-dialog.component.html',
    styleUrls: ['./group-new-dialog.component.scss']
})
export class AigGroupNewNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigGroupNewNewUpdateModalComponent>,
    ) { }

    ngOnInit(): void { }
}
