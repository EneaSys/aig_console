import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './eopoo-type-new-modal.component.html',
    styleUrls: ['./eopoo-type-new-modal.component.scss']
})
export class AigEopooTypeNewModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigEopooTypeNewModalComponent>,
    ) { }

    ngOnInit(): void { }
}
