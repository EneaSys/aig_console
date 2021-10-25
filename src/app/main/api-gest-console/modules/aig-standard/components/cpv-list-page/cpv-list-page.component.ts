import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CpvDTO, CpvResourceService } from 'aig-standard';
import { AigCpvNewUpdateModalComponent } from '../cpv-new-update-modal/cpv-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-cpv-list-page',
    templateUrl: './cpv-list-page.component.html',
    styleUrls: ['./cpv-list-page.component.scss']
})
export class AigCpvListPageComponent extends GenericComponent {
    constructor(
        private cpvResourceService: CpvResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initCpvSearch();

		this.showAllCpv();
	}

	reloadPage() {
		this.showAllCpv();
	}

    //			---- CPV TABLE AND SEARCH SECTION ----
    
	cpvDTOs: CpvDTO[];
    cpvDC: string[];
	cpvError: any;

    cpvSearchFormGroup: FormGroup;
	cpvFilters: any;

	cpvPaginationSize: number;
	cpvLength: number;

    
    private initCpvSearch() {
		this.cpvPaginationSize = 10;

		this.cpvSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});

		this.cpvDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];
    }
    
    private clearFiltersCpv() {
		this.cpvFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchCpv(page: number) {
		this.cpvDTOs = null;

		this.cpvFilters.page = page;
		this.cpvFilters.size = this.cpvPaginationSize;

		try {
			this.cpvLength = await this.cpvResourceService.countCpvsUsingGET(this.cpvFilters).toPromise();

			if(this.cpvLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.cpvDTOs = [];
				return;
			}

			this.cpvDTOs = await this.cpvResourceService.getAllCpvsUsingGET(this.cpvFilters).toPromise();
		} catch (e) {
			this.cpvError = e;
		}
    }
    
    showAllCpv() {
		this.resetFiltersCpv()
    }
    
    resetFiltersCpv() {
		this.cpvSearchFormGroup.reset();
		this.clearFiltersCpv();
		this.searchCpv(0);
    }
    
    cpvPaginationEvent(pageEvent: PageEvent) {
		this.cpvPaginationSize = pageEvent.pageSize;
		this.searchCpv(pageEvent.pageIndex);
	}

    cpvSearchWithFilter() {
		let searchedId = this.cpvSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersCpv();
			this.cpvSearchFormGroup.reset();
			this.cpvFilters.idEquals = searchedId;
			this.searchCpv(0);
			return;
		}

		this.cpvFilters.idEquals = null;

		this.cpvFilters.nameContains = this.cpvSearchFormGroup.controls.name.value;

		this.searchCpv(0);
	}

    newCpv(): void {
        this.dialog.open(AigCpvNewUpdateModalComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise();
	}*/
    //			---- !CPV TABLE AND SEARCH SECTION ----
}