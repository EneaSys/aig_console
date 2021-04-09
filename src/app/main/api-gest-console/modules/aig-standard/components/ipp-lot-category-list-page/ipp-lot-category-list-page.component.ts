import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ItalianPublicProcurementLotCategoryDTO, ItalianPublicProcurementLotCategoryResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigLotCategoryNewUpdateModalComponent } from '../ipp-lot-category-new-update-modal/lot-category-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-ipp-lot-category-list-page',
    templateUrl: './ipp-lot-category-list-page.component.html',
    styleUrls: ['./ipp-lot-category-list-page.component.scss']
})
export class AigIppLotCategoryListPageComponent extends GenericComponent {
    constructor(
        private ippLotCategoryResourceService: ItalianPublicProcurementLotCategoryResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initIppLotCategorySearch();

		this.showAllIppLotCategory();
	}

	reloadPage() {
		this.showAllIppLotCategory();
	}

    //			---- IPP LOT CATEGORY TABLE AND SEARCH SECTION ----
    
	ippLotCategoryDTOs: ItalianPublicProcurementLotCategoryDTO[];
    ippLotCategoryDC: string[];
	ippLotCategoryError: any;

    ippLotCategorySearchFormGroup: FormGroup;
	ippLotCategoryFilters: any;

	ippLotCategoryPaginationSize: number;
	ippLotCategoryLength: number;

    
    private initIppLotCategorySearch() {
		this.ippLotCategoryPaginationSize = 10;

		this.ippLotCategorySearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.ippLotCategoryDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersIppLotCategory() {
		this.ippLotCategoryFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchIppLotCategory(page: number) {
		this.ippLotCategoryDTOs = null;

		this.ippLotCategoryFilters.page = page;
		this.ippLotCategoryFilters.size = this.ippLotCategoryPaginationSize;

		try {
			this.ippLotCategoryLength = await this.ippLotCategoryResourceService.countItalianPublicProcurementLotCategoriesUsingGET().toPromise();

			if(this.ippLotCategoryLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.ippLotCategoryDTOs = [];
				return;
			}

			this.ippLotCategoryDTOs = await this.ippLotCategoryResourceService.getAllItalianPublicProcurementLotCategoriesUsingGET().toPromise();
		} catch (e) {
			this.ippLotCategoryError = e;
		}
    }
    
    showAllIppLotCategory() {
		this.resetFiltersIppLotCategory()
    }
    
    resetFiltersIppLotCategory() {
		this.ippLotCategorySearchFormGroup.reset();
		this.clearFiltersIppLotCategory();
		this.searchIppLotCategory(0);
    }
    
    ippLotCategoryPaginationEvent(pageEvent: PageEvent) {
		this.ippLotCategoryPaginationSize = pageEvent.pageSize;
		this.searchIppLotCategory(pageEvent.pageIndex);
	}

    ippLotCategorySearchWithFilter() {
		let searchedId = this.ippLotCategorySearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersIppLotCategory();
			this.ippLotCategorySearchFormGroup.reset();
			this.ippLotCategoryFilters.idEquals = searchedId;
			this.searchIppLotCategory(0);
			return;
		}

		this.ippLotCategoryFilters.idEquals = null;

		this.ippLotCategoryFilters.nameContains = this.ippLotCategorySearchFormGroup.controls.name.value;

		this.searchIppLotCategory(0);
	}

    newIppLotCategory(){
        this.dialog.open(AigLotCategoryNewUpdateModalComponent, {data: { ippLotCategory: {} } });
    }
    //			---- !IPP LOT CATEGORY TABLE AND SEARCH SECTION ----
}