import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlPpPartecipationTypeDTO, IlPpPartecipationTypeResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigPartecipationTypeNewUpdateDialogComponent } from '../partecipation-type-new-update-dialog/partecipation-type-new-update-dialog.component';

@Component({
    selector: 'aig-partecipation-type-list-page',
    templateUrl: './partecipation-type-list-page.component.html',
    styleUrls: ['./partecipation-type-list-page.component.scss']
})
export class AigPartecipationTypeListPageComponent extends GenericComponent {
    constructor(
        private partecipationTypeResourceService: IlPpPartecipationTypeResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initPartecipationTypeSearch();

		this.showAllPartecipationType();
	}

	reloadPage() {
		this.showAllPartecipationType();
	}

    //			---- Partecipation Type TABLE AND SEARCH SECTION ----
    
	partecipationTypeDTOs: IlPpPartecipationTypeDTO[];
    partecipationTypeDC: string[];
	partecipationTypeError: any;

    partecipationTypeSearchFormGroup: FormGroup;
	partecipationTypeFilters: any;

	partecipationTypePaginationSize: number;
	partecipationTypeLength: number;

    
    private initPartecipationTypeSearch() {
		this.partecipationTypePaginationSize = 10;

		this.partecipationTypeSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.partecipationTypeDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];
    }
    
    private clearFiltersPartecipationType() {
		this.partecipationTypeFilters = {
			idEquals: null,
			page: 0,
		}
    }
    
    private async searchPartecipationType(page: number) {
		this.partecipationTypeDTOs = null;

		this.partecipationTypeFilters.page = page;
		this.partecipationTypeFilters.size = this.partecipationTypePaginationSize;

		try {
			this.partecipationTypeLength = await this.partecipationTypeResourceService.countIlPpPartecipationTypesUsingGET(this.partecipationTypeFilters).toPromise();

			if(this.partecipationTypeLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.partecipationTypeDTOs = [];
				return;
			}

			this.partecipationTypeDTOs = await this.partecipationTypeResourceService.getAllIlPpPartecipationTypesUsingGET(this.partecipationTypeFilters).toPromise();
		} catch (e) {
			this.partecipationTypeError = e;
		}
    }
    
    showAllPartecipationType() {
		this.resetFiltersPartecipationType()
    }
    
    resetFiltersPartecipationType() {
		this.partecipationTypeSearchFormGroup.reset();
		this.clearFiltersPartecipationType();
		this.searchPartecipationType(0);
    }
    
    partecipationTypePaginationEvent(pageEvent: PageEvent) {
		this.partecipationTypePaginationSize = pageEvent.pageSize;
		this.searchPartecipationType(pageEvent.pageIndex);
	}

    partecipationTypeSearchWithFilter() {
		let searchedId = this.partecipationTypeSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPartecipationType();
			this.partecipationTypeSearchFormGroup.reset();
			this.partecipationTypeFilters.idEquals = searchedId;
			this.searchPartecipationType(0);
			return;
		}

		this.partecipationTypeFilters.idEquals = null;

		this.partecipationTypeFilters.nameContains = this.partecipationTypeSearchFormGroup.controls.name.value;

		this.searchPartecipationType(0);
	}

    newPartecipationType(){
        this.dialog.open(AigPartecipationTypeNewUpdateDialogComponent, {data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise();
	}*/

	
    //			---- !partecipation Type TABLE AND SEARCH SECTION ----
}