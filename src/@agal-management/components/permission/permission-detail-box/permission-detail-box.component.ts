import { Component, Input, OnInit } from '@angular/core';
import { PermissionDTO } from 'aig-management';

@Component({
    selector: 'agal-permission-detail-box',
    templateUrl: './permission-detail-box.component.html',
    styleUrls: ['./permission-detail-box.component.scss']
})
export class AgalPermissionDetailBoxComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    permission: PermissionDTO;
}