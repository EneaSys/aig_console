import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { fuseAnimations } from '@fuse/animations';
import { EopooService } from 'aig-common/old-common/services/eopoo.service';

@Component({
    selector: 'aig-eopoo-list-table',
    templateUrl: './eopoo-list-table.component.html',
    styleUrls: ['./eopoo-list-table.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class EopooListTableComponent implements OnInit {
    displayedColumns: string[] = ['id', 'type', 'name', 'taxid', 'buttons'];
    dataSource: any[];
    totalItems: number;

    constructor(
        private eopooService: EopooService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.eopooService.query().subscribe(
            (res: HttpResponse<any[]>) => this.paginateEopoos(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected paginateEopoos(data: any[], headers: HttpHeaders) {
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.dataSource = data;
    }

    protected onError(errorMessage: string) {
        console.log("Errore: ", errorMessage);
    }
    
    detailEopoo(idEopoo: string){
        this.router.navigate(['eopoo', 'detail', idEopoo]);
    }
}
