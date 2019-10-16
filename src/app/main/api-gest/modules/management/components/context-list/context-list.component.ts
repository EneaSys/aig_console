import { Component, OnInit } from '@angular/core';
import { CurrentUserService, ResponseMyContexts } from 'api-gest';

@Component({
    templateUrl: './context-list.component.html',
    styleUrls: ['./context-list.component.scss']
})
export class AigContextListComponent implements OnInit {
    constructor(
        private currentUserService: CurrentUserService
    ) { }

    displayedColumns: string[] = ['name', 'contextCode', 'buttons'];
    dataSource: any[];

    ngOnInit(): void {
        this.loadUsers();
    }

    private loadUsers(){
        this.currentUserService.getMyContexts().subscribe(
            (contexts: ResponseMyContexts[])=>{
                this.dataSource = contexts;
            }
        )
    }
}
