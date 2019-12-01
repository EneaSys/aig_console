import { Component, OnInit, Input } from '@angular/core';
import { PermissionDTO } from 'api-gest';

@Component({
    selector: 'aig-permission-table',
    templateUrl: './permission-table.component.html',
    styleUrls: ['./permission-table.component.scss']
})
export class AigPermissionTableComponent implements OnInit {
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
