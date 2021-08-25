import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigAwardCriterionNewUpdateDialogComponent } from '../award-criterion-new-update-dialog/award-criterion-new-update-dialog.component';
import { IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotAwardCriterionResourceService } from 'aig-standard';

@Component({
    selector: 'aig-award-criterion-list-page',
    templateUrl: './award-criterion-list-page.component.html',
    styleUrls: ['./award-criterion-list-page.component.scss']
})
export class AigAwardCriterionListPageComponent extends GenericComponent {
    constructor(
        private procurementLotAwardCriterionResourceService: IlPpProcurementLotAwardCriterionResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initAwardCriterionSearch();

		this.showAllAwardCriterion();
	}

	reloadPage() {
		this.showAllAwardCriterion();
	}

    //			---- Award Criterion TABLE AND SEARCH SECTION ----
    
	awardCriterionDTOs: IlPpProcurementLotAwardCriterionDTO[];
    awardCriterionDC: string[];
	awardCriterionError: any;

    awardCriterionSearchFormGroup: FormGroup;
	awardCriterionFilters: any;

	awardCriterionPaginationSize: number;
	awardCriterionLength: number;

    
    private initAwardCriterionSearch() {
		this.awardCriterionPaginationSize = 10;

		this.awardCriterionSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.awardCriterionDC = ['id','code', 'name','description','wikiCode', 'buttons'];
    }
    
    private clearFiltersAwardCriterion() {
		this.awardCriterionFilters = {
			idEquals: null,
			page: 0,
		}
    }
    
    private async searchAwardCriterion(page: number) {
		this.awardCriterionDTOs = null;

		this.awardCriterionFilters.page = page;
		this.awardCriterionFilters.size = this.awardCriterionPaginationSize;

		try {
			this.awardCriterionLength = await this.procurementLotAwardCriterionResourceService.countIlPpProcurementLotAwardCriteriaUsingGET(this.awardCriterionFilters).toPromise();

			if(this.awardCriterionLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.awardCriterionDTOs = [];
				return;
			}

			this.awardCriterionDTOs = await this.procurementLotAwardCriterionResourceService.getAllIlPpProcurementLotAwardCriteriaUsingGET(this.awardCriterionFilters).toPromise();
		} catch (e) {
			this.awardCriterionError = e;
		}
    }
    
    showAllAwardCriterion() {
		this.resetFiltersAwardCriterion()
    }
    
    resetFiltersAwardCriterion() {
		this.awardCriterionSearchFormGroup.reset();
		this.clearFiltersAwardCriterion();
		this.searchAwardCriterion(0);
    }
    
    awardCriterionPaginationEvent(pageEvent: PageEvent) {
		this.awardCriterionPaginationSize = pageEvent.pageSize;
		this.searchAwardCriterion(pageEvent.pageIndex);
	}

    awardCriterionSearchWithFilter() {
		let searchedId = this.awardCriterionSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersAwardCriterion();
			this.awardCriterionSearchFormGroup.reset();
			this.awardCriterionFilters.idEquals = searchedId;
			this.searchAwardCriterion(0);
			return;
		}

		this.awardCriterionFilters.idEquals = null;

		this.awardCriterionFilters.nameContains = this.awardCriterionSearchFormGroup.controls.name.value;

		



		this.searchAwardCriterion(0);
	}

    newAwardCriterion(){
        this.dialog.open(AigAwardCriterionNewUpdateDialogComponent, {data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/

	
    //			---- !award Criterion TABLE AND SEARCH SECTION ----
}