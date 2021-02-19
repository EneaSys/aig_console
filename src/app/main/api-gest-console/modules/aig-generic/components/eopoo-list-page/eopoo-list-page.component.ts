import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO } from 'aig-generic';
import { MatDialog } from '@angular/material/dialog';
import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './eopoo-list-page.component.html',
    styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
    constructor(
        private eopooResourceService: EopooResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    searchForm: FormGroup;
    
    displayColumns: string[] = ['id', 'type', 'name', 'taxid', 'buttons'];
    eopooDTOs: EopooDTO[];
    error: any;

    filters = {
        taxId: null,
    }

    pageable = {
        page: 0,
        size: 30,
    }
    length: number = 500;
    index: number;

    loadPage() {
        this.searchForm = this._formBuilder.group({
            id: [''],
            taxId: [''],
        });

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
            this.eopooDTOs = await this.eopooResourceService.getAllEopoosUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.pageable.page,null,null,null,null,null,null,null,null,this.pageable.size,null,null,null,this.filters.taxId,null,null,null).toPromise();
        } catch(error) {
            this.error = error;
        }
    }

    newEopoo() {
        this.dialog.open(AigEopooNewModalComponent, { data: { } });
    }

    customSearch() {
        this.filters.taxId = this.searchForm.value.taxId;
        this.loadEopoo(0);
    }
}
