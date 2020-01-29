import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-city-list-table',
    templateUrl: './city-list-table.component.html',
    styleUrls: ['./city-list-table.component.scss']
})
export class AigCityListTableComponent implements OnInit {
    @Input()
    displayedColumns: string[];
    @Input()
    dataSource: any[];
    
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }

    public detailCity(idCity: string){
        this.router.navigate(['s6d', 'city', 'detail', idCity]);
    }
}
