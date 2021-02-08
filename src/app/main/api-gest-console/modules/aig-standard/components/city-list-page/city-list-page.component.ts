import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
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

		this.citySearchFormGroup.reset();
	}

	reloadPage() {
		this.showAllCity();
	}

    //			---- CITY TABLE AND SEARCH SECTION ----
    
    citySearchFormGroup: FormGroup;
	cityPagination: any;
	cityFilters: any;

	cityLength: number;
	cityDTOs: CityDTO[];
	cityError: any;

    cityDC: string[];
    
    private initCitySearch() {
		this.cityPagination = {
			size: 10,
			page: 0,
		}

		this.citySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.cityDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersCity() {
		this.cityFilters = {
			id: null,
			name: null,
			code: null,
		}
    }
    
    private async searchCity(page: number) {
		this.cityPagination.page = page;
		this.cityDTOs = null;
		try {
			this.cityLength = await this.cityResourceService.countCitiesUsingGET(null,null,this.cityFilters.code,null,null,null,this.cityFilters.id,null,null,null,null,null,null,null,this.cityFilters.name,null,null,null,null,null,null,null,null,null,null,null,null,).toPromise();

			if(this.cityLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.cityDTOs = [];
				return;
			}

			this.cityDTOs = await this.cityResourceService.getAllCitiesUsingGET(null,null,this.cityFilters.code,null,null,null,this.cityFilters.id,null,null,null,null,null,null,null,this.cityFilters.name,null,null,null,null,null,this.cityPagination.page,this.cityPagination.size,null,null,null,null,null,null,null,null,).toPromise();
		} catch (e) {
			this.cityError = e;
		}
    }
    
    showAllCity() {
		this.clearFiltersCity();
		this.searchCity(0);
    }
    
    resetFiltersCity() {
		this.citySearchFormGroup.reset();
		this.showAllCity();
    }
    
    cityPaginationEvent(pageEvent: PageEvent) {
		this.cityPagination.size = pageEvent.pageSize;
		this.searchCity(pageEvent.pageIndex);
	}

    citySearchWithFilter() {
		let searchedId = this.citySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersCity();
			this.citySearchFormGroup.reset();
			this.cityFilters.id = searchedId;
			this.searchCity(0);
			return;
		}

		this.cityFilters.name = this.citySearchFormGroup.controls.name.value;

		this.cityFilters.code = this.citySearchFormGroup.controls.code.value;

		this.searchCity(0);
	}

    newCity(){
        this.dialog.open(AigCityNewUpdateModalComponent, { data: { city: {} } });
    }
    //			---- !CITY TABLE AND SEARCH SECTION ----
}