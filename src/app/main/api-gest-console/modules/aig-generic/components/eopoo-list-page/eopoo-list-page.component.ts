import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { EopooResourceService, EopooDTO, EopooTypeDTO } from 'aig-generic';

import { AigEopooNewModalComponent } from '../eopoo-new-modal/eopoo-new-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
	templateUrl: './eopoo-list-page.component.html',
	styleUrls: ['./eopoo-list-page.component.scss']
})
export class AigEopooListPageComponent extends GenericComponent {
	constructor(
		private eopooResourceService: EopooResourceService,

		private genericAutocompleteFilterService: AigGenericAutocompleteFilterService,
		public genericAutocompleteFunctionService: AigGenericAutocompleteDisplayService,
		
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
		private eventService: EventService,
		private _formBuilder: FormBuilder,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		aigGenericComponentService: AigGenericComponentService,
	) { super(aigGenericComponentService) }

	loadPage() {
		this.initEopooSearch();

		this.showAllEopoo();
	}

	reloadPage() {
		this.showAllEopoo();
	}






	buttons: any[] = [
        {
            name: "dettagli",
			fn: (e: any) => {
				this.router.navigateByUrl("g5c/eopoo/detail/"+ e.id)
			}
        },{
            name: "modifica",
			fn: (eopooDTO:any) => {
				this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: eopooDTO } });
			}
        }, {
            name: "elimina",
			fn: (eopooDTO: any) => {
				this._fuseProgressBarService.show();

        		try {
            		this.eopooResourceService.deleteEopooUsingDELETE(eopooDTO.id).toPromise();
            		this._snackBar.open(`Eopoo: '${eopooDTO.id}' deleted.`, null, { duration: 2000, });

            		this.eventService.reloadCurrentPage();
        		} 
				catch (e) {
            		this._snackBar.open(`Error during deleting eopoo: '${eopooDTO.id}'. (${e.message})`, null, { duration: 5000, });
        		}
        		this._fuseProgressBarService.hide();
			}
        }
    ];









	//			---- EOPOO TABLE AND SEARCH SECTION ----
	eopooDTOs: EopooDTO[];
	eopooDC: string[];
	eopooError: any;
	
	eopooPaginationSize: number;
	eopooLength: number;



	searchForm: FormGroup;
	eopooFilters: any;

	filteredEopooType: Observable<EopooTypeDTO[]>;

	private initEopooSearch() {
		this.eopooPaginationSize = 30;

		this.searchForm = this._formBuilder.group({
			eopooIDEquals: [''],
			eopooCompleteNameContains: [''],
			eopooTaxNumberContains: [''],
			eopooTypeIDEquals: [''],
		});

		this.filteredEopooType = this.genericAutocompleteFilterService.filterEopooType(this.searchForm.controls['eopooTypeIDEquals'].valueChanges);

		this.eopooDC = ['id', 'eopooType', 'name', 'taxId', 'buttons'];
	}

	private clearFiltersEopoo() {
		this.eopooFilters = {
			page: 0,
		}
	}

	private async searchEopoo(page: number) {
		this.eopooDTOs = null;

		this.eopooFilters.page = page;
		this.eopooFilters.size = this.eopooPaginationSize;

		try {
			//this.eopooLength = await this.eopooResourceService.countEopoosUsingGET(this.eopooFilters).toPromise();

			if (this.eopooLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, { duration: 2000, });
				this.eopooDTOs = [];
				return;
			}

			//this.eopooDTOs = await this.eopooResourceService.getAllEopoosUsingGET(this.eopooFilters).toPromise();
		} catch (e) {
			this.eopooError = e;
		}
    }

	showAllEopoo() {
		this.resetFiltersEopoo()
	}

	resetFiltersEopoo() {
		this.searchForm.reset();
		this.clearFiltersEopoo();
		this.searchEopoo(0);
	}

	eopooPaginationEvent(pageEvent: PageEvent) {
		this.eopooPaginationSize = pageEvent.pageSize;
		this.searchEopoo(pageEvent.pageIndex);
	}

	eopooSearchWithFilter() {
		let searchedId = this.searchForm.value.eopooIDEquals;

		if (searchedId != null) {
			this.clearFiltersEopoo();
			this.searchForm.reset();
			this.eopooFilters.eopooIDEquals = searchedId;
			this.searchEopoo(0);
			return;
		}

		this.eopooFilters.eopooIDEquals = null;

		if (this.searchForm.value.eopooCompleteNameContains) {
			this.eopooFilters.eopooCompleteNameContains = this.searchForm.value.eopooCompleteNameContains;
		}

		if (this.searchForm.value.eopooTaxNumberContains) {
			this.eopooFilters.eopooTaxNumberContains = this.searchForm.value.eopooTaxNumberContains;
		}

		if (this.searchForm.value.eopooTypeIDEquals) {
			this.eopooFilters.eopooTypeIDEquals = this.searchForm.value.eopooTypeIDEquals.id;
		}

		this.searchEopoo(0);
	}

	newEopoo() {
		this.dialog.open(AigEopooNewModalComponent, { data: { eopoo: {} } });
	}
	//			---- !EOPOO TABLE AND SEARCH SECTION ----
}