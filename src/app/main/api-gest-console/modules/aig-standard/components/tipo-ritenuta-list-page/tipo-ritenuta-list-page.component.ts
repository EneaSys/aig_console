import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { IlFeRitenutaTipoResourceService, IlFeRitenutaTipoDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigTipoRitenutaNewUpdateDialogComponent } from '../tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';

@Component({
	selector: 'aig-tipo-ritenuta-list-page',
    templateUrl: './tipo-ritenuta-list-page.component.html',
    styleUrls: ['./tipo-ritenuta-list-page.component.scss']
})
export class AigTipoRitenutaListPageComponent extends GenericComponent {
    constructor(
        private tipoRitenutaResourceService: IlFeRitenutaTipoResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initTipoRitenutaSearch();

		this.showAllTipoRitenuta();
	}

	reloadPage() {
		this.showAllTipoRitenuta();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	tipoRitenutaDTOs: IlFeRitenutaTipoDTO[];
    tipoRitenutaDC: string[];
	tipoRitenutaError: any;

    tipoRitenutaSearchFormGroup: FormGroup;
	tipoRitenutaFilters: any;

	tipoRitenutaPaginationSize: number;
	tipoRitenutaLength: number;

    
    private initTipoRitenutaSearch() {
		this.tipoRitenutaDC = ['id','code', 'name','description','wikiCode', 'buttons'];

		this.tipoRitenutaPaginationSize = 10;
		

		this.tipoRitenutaSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
		});
	}

    
    private clearFiltersTipoRitenuta() {
		this.tipoRitenutaFilters = {
			tipoRitenutaFiltersIDEquals: null,
			tipoRitenutaFiltersNameContains: null,
			page: 0,
		}
    }
    
    private async searchTipoRitenuta(page: number) {
		this.tipoRitenutaDTOs = null;

		this.tipoRitenutaFilters.page = page;
		this.tipoRitenutaFilters.size = this.tipoRitenutaPaginationSize;

		try {
			this.tipoRitenutaLength = await this.tipoRitenutaResourceService.countIlFeRitenutaTiposUsingGET(this.tipoRitenutaFilters).toPromise();

			if(this.tipoRitenutaLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoRitenutaDTOs = [];
				return;
			}

			this.tipoRitenutaDTOs = await this.tipoRitenutaResourceService.getAllIlFeRitenutaTiposUsingGET(this.tipoRitenutaFilters).toPromise();
		} catch (e) {
			this.tipoRitenutaError = e;
		}
    }
    
    showAllTipoRitenuta() {
		this.resetFiltersTipoRitenuta()
    }
    
    resetFiltersTipoRitenuta() {
		this.tipoRitenutaSearchFormGroup.reset();
		this.clearFiltersTipoRitenuta();
		this.searchTipoRitenuta(0);
    }
    
    tipoRitenutaPaginationEvent(pageEvent: PageEvent) {
		this.tipoRitenutaPaginationSize = pageEvent.pageSize;
		this.searchTipoRitenuta(pageEvent.pageIndex);
	}

    tipoRitenutaSearchWithFilter() {
		let searchedId = this.tipoRitenutaSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTipoRitenuta();
			this.tipoRitenutaSearchFormGroup.reset();
			this.tipoRitenutaFilters.idEquals = searchedId;
			this.searchTipoRitenuta(0);
			return;
		}

		this.tipoRitenutaFilters.tipoRitenutaIDEquals = null;

		this.tipoRitenutaFilters.tipoRitenutaNameContains = this.tipoRitenutaSearchFormGroup.controls.name.value;

		this.searchTipoRitenuta(0);
	}

    newTipoRitenuta(){
        this.dialog.open(AigTipoRitenutaNewUpdateDialogComponent, { data: {} });
    }

	/*async publish() {
		await this.buyerResourceService.publishUsingGET(this.buyerFilters).toPromise;
	}*/
    //			---- !TABLE AND SEARCH SECTION ----
}