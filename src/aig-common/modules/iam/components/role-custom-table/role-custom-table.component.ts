import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-role-custom-table',
    templateUrl: './role-custom-table.component.html',
    styleUrls: ['./role-custom-table.component.scss']
})
export class AigRoleCustomTableComponent implements OnInit {   
    constructor(
        private router: Router,
    ) { }

    @Input()
    error: any;
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];

    ngOnInit(): void { }

    public detailCustomRole(idCustomRole: string){
        this.router.navigate(['iam', 'role', 'detail', idCustomRole]);
    }
}
