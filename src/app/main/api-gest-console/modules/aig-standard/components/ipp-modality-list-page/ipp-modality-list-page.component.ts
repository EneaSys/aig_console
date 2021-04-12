import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementModalityResourceService, ItalianPublicProcurementModalityDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigIppModalityNewUpdateModalComponent } from '../ipp-modality-new-update-modal/ipp-modality-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-ipp-lot-modality-list-page',
    templateUrl: './ipp-modality-list-page.component.html',
    styleUrls: ['./ipp-modality-list-page.component.scss']
})
export class AigIppModalityListPageComponent extends GenericComponent {
    constructor(
        private ippModalityResourceService: ItalianPublicProcurementModalityResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initIppModalitySearch();

		this.showAllIppModality();
	}

	reloadPage() {
		this.showAllIppModality();
	}

    //			---- IPP MODALITY TABLE AND SEARCH SECTION ----
    
	ippModalityDTOs: ItalianPublicProcurementModalityDTO[];
    ippModalityDC: string[];
	ippModalityError: any;

    ippModalitySearchFormGroup: FormGroup;
	ippModalityFilters: any;

	ippModalityPaginationSize: number;
	ippModalityLength: number;

    
    private initIppModalitySearch() {
		this.ippModalityPaginationSize = 10;

		this.ippModalitySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.ippModalityDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersIppModality() {
		this.ippModalityFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchIppModality(page: number) {
		this.ippModalityDTOs = null;

		this.ippModalityFilters.page = page;
		this.ippModalityFilters.size = this.ippModalityPaginationSize;

		try {
			this.ippModalityLength = await this.ippModalityResourceService.countItalianPublicProcurementModalitiesUsingGET().toPromise();

			if(this.ippModalityLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.ippModalityDTOs = [];
				return;
			}

			this.ippModalityDTOs = await this.ippModalityResourceService.getAllItalianPublicProcurementModalitiesUsingGET().toPromise();
		} catch (e) {
			this.ippModalityError = e;
		}
    }
    
    showAllIppModality() {
		this.resetFiltersIppModality()
    }
    
    resetFiltersIppModality() {
		this.ippModalitySearchFormGroup.reset();
		this.clearFiltersIppModality();
		this.searchIppModality(0);
    }
    
    ippModalityPaginationEvent(pageEvent: PageEvent) {
		this.ippModalityPaginationSize = pageEvent.pageSize;
		this.searchIppModality(pageEvent.pageIndex);
	}

    ippModalitySearchWithFilter() {
		let searchedId = this.ippModalitySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersIppModality();
			this.ippModalitySearchFormGroup.reset();
			this.ippModalityFilters.idEquals = searchedId;
			this.searchIppModality(0);
			return;
		}

		this.ippModalityFilters.idEquals = null;

		this.ippModalityFilters.nameContains = this.ippModalitySearchFormGroup.controls.name.value;

		this.searchIppModality(0);
	}

    newIppModality(){
        this.dialog.open(AigIppModalityNewUpdateModalComponent, { data: { ippModality: {} } });
    }
    //			---- !IPP MODALITY TABLE AND SEARCH SECTION ----
}