import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-cpv-list-table',
    templateUrl: './cpv-list-table.component.html',
    styleUrls: ['./cpv-list-table.component.scss']
})
export class AigCpvListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input() 
    dataSource: any[];
    @Input()
    error: any[];
    
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    public detailCpv(idCpv: string){
        this.router.navigate(['s6d', 'cpv', 'detail', idCpv]);
    }
}
