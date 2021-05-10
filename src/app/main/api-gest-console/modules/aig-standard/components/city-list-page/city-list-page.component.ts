import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
	selector: 'aig-city-list-page',
    templateUrl: './city-list-page.component.html',
    styleUrls: ['./city-list-page.component.scss']
})
export class AigCityListPageComponent extends GenericComponent {
    constructor(
        private cityResourceService: CityResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initCitySearch();

		this.showAllCity();
	}

	reloadPage() {
		this.showAllCity();
	}

    //			---- CITY TABLE AND SEARCH SECTION ----
    
	cityDTOs: CityDTO[];
    cityDC: string[];
	cityError: any;

    citySearchFormGroup: FormGroup;
	cityFilters: any;

	cityPaginationSize: number;
	cityLength: number;

    
    private initCitySearch() {
		this.cityPaginationSize = 10;

		this.citySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
			wikiCode: [''],
			description: [''],
		});

		this.cityDC = ['id','description', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersCity() {
		this.cityFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchCity(page: number) {
		this.cityDTOs = null;

		this.cityFilters.page = page;
		this.cityFilters.size = this.cityPaginationSize;

		try {
			this.cityLength = await this.cityResourceService.countCitiesUsingGET(this.cityFilters).toPromise();

			if(this.cityLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.cityDTOs = [];
				return;
			}

			this.cityDTOs = await this.cityResourceService.getAllCitiesUsingGET(this.cityFilters).toPromise();
		} catch (e) {
			this.cityError = e;
		}
    }
	//             ---- FILTER CITY SECTION ----
    showAllCity() {
		this.resetFiltersCity()
    }
                   
    resetFiltersCity() {
		this.citySearchFormGroup.reset();
		this.clearFiltersCity();
		this.searchCity(0);
    }
    
    cityPaginationEvent(pageEvent: PageEvent) {
		this.cityPaginationSize = pageEvent.pageSize;
		this.searchCity(pageEvent.pageIndex);
	}

    citySearchWithFilter() {
		let searchedId = this.citySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersCity();
			this.citySearchFormGroup.reset();
			this.cityFilters.idEquals = searchedId;
			this.searchCity(0);
			return;
		}

		this.cityFilters.idEquals = null;

		this.cityFilters.nameContains = this.citySearchFormGroup.controls.name.value;

		this.searchCity(0);
	}
	//             ---- !FILTER CITY SECTION ----

    newCity(){
        this.dialog.open(AigCityNewUpdateModalComponent, { data: { city: {} } });
    }
    //			---- !CITY TABLE AND SEARCH SECTION ----
}