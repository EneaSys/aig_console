import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ContextModuleDTO, ContextModuleResourceService } from 'api-gest';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';

@Component({
    selector: 'aig-context-module-list-page',
    templateUrl: './context-module-list-page.component.html',
    styleUrls: ['./context-module-list-page.component.scss']
})

export class AigContextModuleListPageComponent extends GenericComponent {
 
    constructor(
        private contextModuleResourceService: ContextModuleResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    
   contextModuleDTOs: ContextModuleDTO[]; 
   contextModuleDC: string[] = [ "id", "active", "module"];
   contextModuleError: any;

   length: number;
   page: number;
   size: number;

   loadPage() {
    this.reloadPage();
   }

    paginationEvent(pageEvent: PageEvent) {
        this.page = pageEvent.pageIndex;
        this.size = pageEvent.pageSize;
        
        this.reloadPage();
    }

    async reloadPage() {
        try {
            this.length = await this.contextModuleResourceService.countContextModulesUsingGET().toPromise();
            this.contextModuleDTOs = await this.contextModuleResourceService.getAllContextModulesUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.page,this.size).toPromise()
        } catch(e) { 
            this.contextModuleError = e;
        }
    }
}