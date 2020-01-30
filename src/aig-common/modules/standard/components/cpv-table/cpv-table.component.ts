import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-cpv-table',
    templateUrl: './cpv-table.component.html',
    styleUrls: ['./cpv-table.component.scss']
})
export class AigCpvTableComponent implements OnInit {
    @Input() displayedColumns: string[];
    @Input() dataSource: any[];
    
    testDataSource: any[];

    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void {
        const test = {
            id: 1,
            name: 'test',
            code: 'test',
            wikiCode: 'test',
        }
        this.testDataSource = [];
        this.testDataSource.push(test);
    }

    public detailCpv(idCpv: string){
        this.router.navigate(['s6d', 'cpv', 'detail', idCpv]);
    }
}
