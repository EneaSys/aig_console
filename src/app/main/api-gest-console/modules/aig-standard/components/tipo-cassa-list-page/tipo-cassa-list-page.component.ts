import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlFeCassaTipoDTO, IlFeCassaTipoResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';

@Component({
	selector: 'aig-tipo-cassa-list-page',
    templateUrl: './tipo-cassa-list-page.component.html',
    styleUrls: ['./tipo-cassa-list-page.component.scss']
})
export class AigTipoCassaListPageComponent extends GenericComponent {
    constructor(
        private tipoCassaResourceService: IlFeCassaTipoResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initTipoCassaSearch();

		this.showAllTipoCassa();
	}

	reloadPage() {
		this.showAllTipoCassa();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	tipoCassaDTOs: IlFeCassaTipoDTO[];
    tipoCassaDC: string[];
	tipoCassaError: any;

    tipoCassaSearchFormGroup: FormGroup;
	tipoCassaFilters: any;

	tipoCassaPaginationSize: number;
	tipoCassaLength: number;

    
    private initTipoCassaSearch() {
		this.tipoCassaDC = ['code', 'name','activationDate','expirationDate','wikiCode','description', 'buttons'];

		this.tipoCassaPaginationSize = 10;
		

		this.tipoCassaSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});
	}
	private clearFiltersTipoCassa() {
		this.tipoCassaFilters = {
			idEquals: null,
			valueContains: null,
			page: 0,
		}
    }
    private async searchTipoCassa(page: number) {
		this.tipoCassaDTOs = null;

		this.tipoCassaFilters.page = page;
		this.tipoCassaFilters.size = this.tipoCassaPaginationSize;

		try {                                                                       
			this.tipoCassaLength = await this.tipoCassaResourceService.countIlFeCassaTiposUsingGET(this.tipoCassaFilters).toPromise();  
			
			if(this.tipoCassaLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoCassaDTOs = [];
				return;
			}

			this.tipoCassaDTOs = await this.tipoCassaResourceService.getAllIlFeCassaTiposUsingGET(this.tipoCassaFilters).toPromise();
		} catch (e) {
			this.tipoCassaError = e;
		}
	}
	
    
    showAllTipoCassa() {
		this.resetFiltersTipoCassa()
    }
    
    resetFiltersTipoCassa() {
		this.tipoCassaSearchFormGroup.reset();
		this.clearFiltersTipoCassa();
		this.searchTipoCassa(0);
    }
    
    tipoCassaPaginationEvent(pageEvent: PageEvent) {
		this.tipoCassaPaginationSize = pageEvent.pageSize;
		this.searchTipoCassa(pageEvent.pageIndex);
	}

    tipoCassaSearchWithFilter() {
		let searchedId = this.tipoCassaSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTipoCassa();
			this.tipoCassaSearchFormGroup.reset();
			this.tipoCassaFilters.idEquals = searchedId;
			this.searchTipoCassa(0);
			return;
		}

		this.tipoCassaFilters.idEquals = null;

		this.tipoCassaFilters.valueContains = this.tipoCassaSearchFormGroup.controls.value.value;

		this.searchTipoCassa(0);
	}

    newTipoCassa(){
        this.dialog.open(AigTipoCassaNewUpdateDialogComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/
    //			---- !TABLE AND SEARCH SECTION ----
}