import { Component, OnInit } from '@angular/core';
import { WsUserContextService, ResponseMyContexts } from 'api-gest';
import { AigGenericComponentService } from '../../../generic-component/generic-component.service';
import { GenericComponent } from '../../../generic-component/generic-component';

@Component({
    templateUrl: './context-list-page.component.html',
    styleUrls: ['./context-list-page.component.scss']
})
export class AigContextListPageComponent extends GenericComponent {
    constructor(
        private wsUserContextService: WsUserContextService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['name', 'contextCode', 'buttons'];
    dataSource: any[];

    loadComponent(): void {
        this.wsUserContextService.getMyContexts().subscribe(
            (contexts: ResponseMyContexts[])=>{
                this.dataSource = contexts;
            }
        )
    }
}
