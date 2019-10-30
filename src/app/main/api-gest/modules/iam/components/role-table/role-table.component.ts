import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-role-table',
    templateUrl: './role-table.component.html',
    styleUrls: ['./role-table.component.scss']
})
export class AigRoleTableComponent implements OnInit {
    
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
