import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlFeEsigibilitaIvaResourceService, IlFeEsigibilitaIvaDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigEsigibilitaIvaNewUpdateDialogComponent } from '../esigibilita-iva-new-update-dialog/esigibilita-iva-new-update-dialog.component';


@Component({
	selector: 'aig-esigibilita-iva-list-page',
    templateUrl: './esigibilita-iva-list-page.component.html',
    styleUrls: ['./esigibilita-iva-list-page.component.scss']
})
export class AigEsigibilitaIvaListPageComponent extends GenericComponent {
    constructor(
        private esigibilitaIvaResourceService: IlFeEsigibilitaIvaResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initEsigibilitaIvaSearch();

		this.showAllEsigibilitaIva();
	}

	reloadPage() {
		this.showAllEsigibilitaIva();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	esigibilitaIvaDTOs: IlFeEsigibilitaIvaDTO[];
    esigibilitaIvaDC: string[];
	esigibilitaIvaError: any;

    esigibilitaIvaSearchFormGroup: FormGroup;
	esigibilitaIvaFilters: any;

	esigibilitaIvaPaginationSize: number;
	esigibilitaIvaLength: number;

    
	private initEsigibilitaIvaSearch() {
		this.esigibilitaIvaDC = ["id", "value","description", "buttons"];

		this.esigibilitaIvaPaginationSize = 10;
		

		this.esigibilitaIvaSearchFormGroup = this._formBuilder.group({
			id: [''],
			value: [''],
			
		});
	}

	private clearFiltersEsigibilitaIva() {
		this.esigibilitaIvaFilters = {
			esigibilitaIvaIDEquals: null,
			esigibilitaIvaNameContains: null,
			page: 0,
		}
	}
    
    private async searchEsigibilitaIva(page: number) {
		this.esigibilitaIvaDTOs = null;

		this.esigibilitaIvaFilters.page = page;
		this.esigibilitaIvaFilters.size = this.esigibilitaIvaPaginationSize;

		try {                                                                       
			this.esigibilitaIvaLength = await this.esigibilitaIvaResourceService.countIlFeEsigibilitaIvasUsingGET(this.esigibilitaIvaFilters).toPromise();  
			
			if(this.esigibilitaIvaLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.esigibilitaIvaDTOs = [];
				return;
			}

			this.esigibilitaIvaDTOs = await this.esigibilitaIvaResourceService.getAllIlFeEsigibilitaIvasUsingGET(this.esigibilitaIvaFilters).toPromise();
		} catch (e) {
			this.esigibilitaIvaError = e;
		}
	}
	
    
    showAllEsigibilitaIva() {
		this.resetFiltersEsigibilitaIva()
    }
    
    resetFiltersEsigibilitaIva() {
		this.esigibilitaIvaSearchFormGroup.reset();
		this.clearFiltersEsigibilitaIva();
		this.searchEsigibilitaIva(0);
    }
    
    esigibilitaIvaPaginationEvent(pageEvent: PageEvent) {
		this.esigibilitaIvaPaginationSize = pageEvent.pageSize;
		this.searchEsigibilitaIva(pageEvent.pageIndex);
	}

    esigibilitaIvaSearchWithFilter() {
		let searchedId = this.esigibilitaIvaSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersEsigibilitaIva();
			this.esigibilitaIvaSearchFormGroup.reset();
			this.esigibilitaIvaFilters.idEquals = searchedId;
			this.searchEsigibilitaIva(0);
			return;
		}

		this.esigibilitaIvaFilters.esigibilitaIvaIDEquals = null;

		this.esigibilitaIvaFilters.esigibilitaIvaNameContains = this.esigibilitaIvaSearchFormGroup.controls.name.value;

		this.searchEsigibilitaIva(0);
	}

    newEsigibilitaIva(){
        this.dialog.open(AigEsigibilitaIvaNewUpdateDialogComponent, { data: { esigibilitaIva: {} } });
    }
    //			---- !TABLE AND SEARCH SECTION ----
}