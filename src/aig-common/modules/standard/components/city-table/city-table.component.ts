import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aig-city-table',
    templateUrl: './city-table.component.html',
    styleUrls: ['./city-table.component.scss']
})
export class AigCityTableComponent implements OnInit {
    @Input() displayedColumns: string[];
    @Input() dataSource: any[];
    
    constructor(
        private router: Router,
    ) { }

    ngOnInit(): void { }

    public detailCity(idCity: string){
        this.router.navigate(['s6d', 'city', 'detail', idCity]);
    }
}
