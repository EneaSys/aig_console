import { Component, OnInit } from '@angular/core';
import { WsUserContextService, ResponseMyContexts } from 'api-gest';

@Component({
    templateUrl: './context-list-page.component.html',
    styleUrls: ['./context-list-page.component.scss']
})
export class AigContextListPageComponent implements OnInit {
    constructor(
        private wsUserContextService: WsUserContextService
    ) { }

    displayedColumns: string[] = ['name', 'contextCode', 'buttons'];
    dataSource: any[];

    ngOnInit(): void {
        this.wsUserContextService.getMyContexts().subscribe(
            (contexts: ResponseMyContexts[])=>{
                this.dataSource = contexts;
            }
        )
    }
}
