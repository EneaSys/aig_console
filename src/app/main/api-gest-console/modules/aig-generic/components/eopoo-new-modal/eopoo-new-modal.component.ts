import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './eopoo-new-modal.component.html',
    styleUrls: ['./eopoo-new-modal.component.scss']
})
export class AigEopooNewModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEopooNewModalComponent>,
    ) { }

    ngOnInit(): void { }
}
