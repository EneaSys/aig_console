import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import {  DatiVeicoliDTO, DatiVeicoliResourceService } from 'aig-italianlegislation';
import { AigDatiVeicoliNewUpdateDialogComponent } from '../dati-veicoli-new-update-dialog/dati-veicoli-new-update-dialog.component';


@Component({
    selector: 'aig-dati-veicoli-list-page',
    templateUrl: './dati-veicoli-list-page.component.html',
    styleUrls: ['./dati-veicoli-list-page.component.scss']
})
export class AigDatiVeicoliListPageComponent extends GenericComponent {
    constructor(
        private datiVeicoliResourceService: DatiVeicoliResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initDatiVeicoliSearch();

        this.showAllDatiVeicoli();
    }

    reloadPage() {
        this.showAllDatiVeicoli();
    }

    //			----  TABLE AND SEARCH SECTION ----

    datiVeicoliDTOs: DatiVeicoliDTO[];
    datiVeicoliDC: string[];
    datiVeicoliError: any;

    datiVeicoliSearchFormGroup: FormGroup;
    datiVeicoliFilters: any;

    datiVeicoliPaginationSize: number;
    datiVeicoliLength: number;


    private initDatiVeicoliSearch() {
        this.datiVeicoliPaginationSize = 10;

        this.datiVeicoliSearchFormGroup = this._formBuilder.group({
            id: [''],
        });

        this.datiVeicoliDC = ['id','fatturaElettronicaBody', 'descrizione', 'buttons'];
    }

    private clearFiltersDatiVeicoli() {
        this.datiVeicoliFilters = {
            idEquals: null,
            page: 0,
        }
    }

    private async searchDatiVeicoli(page: number) {
        this.datiVeicoliDTOs = null;

        this.datiVeicoliFilters.page = page;
        this.datiVeicoliFilters.size = this.datiVeicoliPaginationSize;

        try {
            this.datiVeicoliLength = await this.datiVeicoliResourceService.countDatiVeicolisUsingGET(this.datiVeicoliFilters).toPromise();

            if (this.datiVeicoliLength == 0) {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
                this.datiVeicoliDTOs = [];
                return;
            }

            this.datiVeicoliDTOs = await this.datiVeicoliResourceService.getAllDatiVeicolisUsingGET(this.datiVeicoliFilters).toPromise();
        } catch (e) {
            this.datiVeicoliError = e;
        }
    }

    showAllDatiVeicoli() {
        this.resetFiltersDatiVeicoli()
    }

    resetFiltersDatiVeicoli() {
        this.datiVeicoliSearchFormGroup.reset();
        this.clearFiltersDatiVeicoli();
        this.searchDatiVeicoli(0);
    }

    datiVeicoliPaginationEvent(pageEvent: PageEvent) {
        this.datiVeicoliPaginationSize = pageEvent.pageSize;
        this.searchDatiVeicoli(pageEvent.pageIndex);
    }

    datiVeicoliSearchWithFilter() {
        let searchedId = this.datiVeicoliSearchFormGroup.controls.id.value;

        if (searchedId != null) {
            this.clearFiltersDatiVeicoli();
            this.datiVeicoliSearchFormGroup.reset();
            this.datiVeicoliFilters.idEquals = searchedId;
            this.searchDatiVeicoli(0);
            return;
        }

        this.datiVeicoliFilters.idEquals = null;

        this.searchDatiVeicoli(0);
    }

    newDatiVeicoli() {
        this.dialog.open(AigDatiVeicoliNewUpdateDialogComponent, { data: { datiVeicoli: {} } });
    }
    //			---- ! TABLE AND SEARCH SECTION ----
}