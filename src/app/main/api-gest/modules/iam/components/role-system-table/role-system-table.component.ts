import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-role-system-table',
    templateUrl: './role-system-table.component.html',
    styleUrls: ['./role-system-table.component.scss']
})
export class AigRoleSystemTableComponent implements OnInit {
    
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }

    public detailSystemRole(idSystemRole: string){
        this.router.navigate(['iam', 'role', 'detail', 's', idSystemRole]);
    }
}
