import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO, TipoCassaResourceService, TipoCassaDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
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
        private tipoCassaResourceService: TipoCassaResourceService,
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
    
	tipoCassaDTOs: TipoCassaDTO[];
    tipoCassaDC: string[];
	tipoCassaError: any;

    tipoCassaSearchFormGroup: FormGroup;
	tipoCassaFilters: any;

	tipoCassaPaginationSize: number;
	tipoCassaLength: number;

    
    private initTipoCassaSearch() {
		this.tipoCassaDC = ["id", "value","description", "buttons"];

		this.tipoCassaPaginationSize = 10;
		

		this.tipoCassaSearchFormGroup = this._formBuilder.group({
			id: [''],
			value: [''],
			
		});
	}
	private clearFiltersTipoCassa() {
		this.tipoCassaFilters = {
			tipoCassaIDEquals: null,
			tipoCassaNameContains: null,
			page: 0,
		}
    }
    private async searchTipoCassa(page: number) {
		this.tipoCassaDTOs = null;

		this.tipoCassaFilters.page = page;
		this.tipoCassaFilters.size = this.tipoCassaPaginationSize;

		try {                                                                       
			this.tipoCassaLength = await this.tipoCassaResourceService.countTipoCassasUsingGET(this.tipoCassaFilters).toPromise();  
			
			if(this.tipoCassaLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoCassaDTOs = [];
				return;
			}

			this.tipoCassaDTOs = await this.tipoCassaResourceService.getAllTipoCassasUsingGET(this.tipoCassaFilters).toPromise();
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

		this.tipoCassaFilters.tipoCassaIDEquals = null;

		this.tipoCassaFilters.tipoCassaNameContains = this.tipoCassaSearchFormGroup.controls.name.value;

		this.searchTipoCassa(0);
	}

    newTipoCassa(){
        this.dialog.open(AigTipoCassaNewUpdateDialogComponent, { data: { tipoCassa: {} } });
    }
    //			---- !TABLE AND SEARCH SECTION ----
}