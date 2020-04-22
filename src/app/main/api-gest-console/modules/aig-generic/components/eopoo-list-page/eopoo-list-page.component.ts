import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    templateUrl: './eopoo-list-page.component.html',
    styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
    constructor(
        private eopooResourceService: EopooResourceService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    displayedColumns: string[] = ['id', 'type', 'name', 'taxid', 'buttons'];
    eopooDTOs: EopooDTO[];
    error: any;

    filter = {
        seller: null,
    }

    pageable = {
        page: 0,
        size: 30,
    }
    length: number = 500;
    index: number;

    loadPage() {
        this.loadEopoo(0);
    }

    reloadPage() {
        this.loadEopoo(this.pageable.page);
    }

    pageEvent(event: PageEvent) {
        this.pageable.size = event.pageSize;
        this.loadEopoo(event.pageIndex);
    }

    private async loadEopoo(page: number) {
        this.eopooDTOs = null;

        this.index = page
        this.pageable.page = page;

        try {
            this.eopooDTOs = await this.eopooResourceService.getAllEopoosUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.pageable.page,null,null,null,null,null,null,null,null,this.pageable.size,null,null,null,null,null,null,null).toPromise();
        } catch(error) {
            this.error = error;
        }
    }

    newEopoo() {
        this.dialog.open(AigEopooNewModalComponent, { data: { } });
    }
}
