import { Component, OnInit, Input } from '@angular/core';
import { PermissionDTO } from 'api-gest';

@Component({
    selector: 'aig-permission-system-table',
    templateUrl: './permission-system-table.component.html',
    styleUrls: ['./permission-system-table.component.scss']
})
export class AigPermissionSystemTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: PermissionDTO[];
    
    constructor() { }

    ngOnInit(): void { }

    detailPermissionSystem(permissionSystem: PermissionDTO) {
        console.log(permissionSystem);
    }
}
