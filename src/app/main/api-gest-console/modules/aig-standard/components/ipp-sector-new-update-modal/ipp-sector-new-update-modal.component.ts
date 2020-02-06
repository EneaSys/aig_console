import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './ipp-sector-new-update-modal.component.html',
    styleUrls: ['./ipp-sector-new-update-modal.component.scss']
})
export class AigIppSectorNewUpdateModalComponent implements OnInit {
    constructor(
        public matDialogRef: MatDialogRef<AigIppSectorNewUpdateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void { 
    }
}
