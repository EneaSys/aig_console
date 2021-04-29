import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AllegatiDTO, AllegatiResourceService } from 'aig-italianlegislation';
import { AigAllegatiNewUpdateDialogComponent } from '../allegati-new-update-dialog/allegati-new-update-dialog.component';


@Component({
    selector: 'aig-allegati-list-page',
    templateUrl: './allegati-list-page.component.html',
    styleUrls: ['./allegati-list-page.component.scss']
})
export class AigAllegatiListPageComponent extends GenericComponent {
    constructor(
        private allegatiResourceService: AllegatiResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initAllegatiSearch();

        this.showAllAllegati();
    }

    reloadPage() {
        this.showAllAllegati();
    }

    //			----  TABLE AND SEARCH SECTION ----

    allegatiDTOs: AllegatiDTO[];
    allegatiDC: string[];
    allegatiError: any;

    allegatiSearchFormGroup: FormGroup;
    allegatiFilters: any;

    allegatiPaginationSize: number;
    allegatiLength: number;


    private initAllegatiSearch() {
        this.allegatiPaginationSize = 10;

        this.allegatiSearchFormGroup = this._formBuilder.group({
            id: [''],
        });

        this.allegatiDC = ['id','fatturaElettronicaBody', 'descrizione', 'buttons'];
    }

    private clearFiltersAllegati() {
        this.allegatiFilters = {
            idEquals: null,
            page: 0,
        }
    }

    private async searchAllegati(page: number) {
        this.allegatiDTOs = null;

        this.allegatiFilters.page = page;
        this.allegatiFilters.size = this.allegatiPaginationSize;

        try {
            this.allegatiLength = await this.allegatiResourceService.countAllegatisUsingGET(this.allegatiFilters).toPromise();

            if (this.allegatiLength == 0) {
                this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
                this.allegatiDTOs = [];
                return;
            }

            this.allegatiDTOs = await this.allegatiResourceService.getAllAllegatisUsingGET(this.allegatiFilters).toPromise();
            console.log(this.allegatiDTOs);
        } catch (e) {
            this.allegatiError = e;
        }
    }

    showAllAllegati() {
        this.resetFiltersAllegati()
    }

    resetFiltersAllegati() {
        this.allegatiSearchFormGroup.reset();
        this.clearFiltersAllegati();
        this.searchAllegati(0);
    }

    allegatiPaginationEvent(pageEvent: PageEvent) {
        this.allegatiPaginationSize = pageEvent.pageSize;
        this.searchAllegati(pageEvent.pageIndex);
    }

    allegatiSearchWithFilter() {
        let searchedId = this.allegatiSearchFormGroup.controls.id.value;

        if (searchedId != null) {
            this.clearFiltersAllegati();
            this.allegatiSearchFormGroup.reset();
            this.allegatiFilters.idEquals = searchedId;
            this.searchAllegati(0);
            return;
        }

        this.allegatiFilters.idEquals = null;

        this.searchAllegati(0);
    }

    newAllegati() {
        this.dialog.open(AigAllegatiNewUpdateDialogComponent, { data: { allegati: {} } });
    }
    //			---- ! TABLE AND SEARCH SECTION ----
}