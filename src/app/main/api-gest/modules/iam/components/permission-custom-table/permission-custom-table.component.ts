import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'aig-permission-custom-table',
    templateUrl: './permission-custom-table.component.html',
    styleUrls: ['./permission-custom-table.component.scss']
})
export class AigPermissionCustomTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor() { }

    ngOnInit(): void { }

    detailPermissionCustom(permissionCustom: any) {
        console.log(permissionCustom);
    }
}
