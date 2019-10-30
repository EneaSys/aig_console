import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-permission-system-table',
    templateUrl: './permission-system-table.component.html',
    styleUrls: ['./permission-system-table.component.scss']
})
export class AigPermissionSystemTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }

    detailPermissionSystem(permissionSystem: any) {
        console.log(permissionSystem);
    }
}
