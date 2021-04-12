import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO, TipoCassaResourceService, TipoCassaDTO, TipoScontoMaggiorazioneDTO, TipoScontoMaggiorazioneResourceService } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigTipoCassaNewUpdateDialogComponent } from '../tipo-cassa-new-update-dialog/tipo-cassa-new-update-dialog.component';
import { AigTipoScontMaggioranzaNewUpdateDialogComponent } from '../tipo-sconto-maggioranza-new-update-dialog/tipo-sconto-maggioranza-new-update-dialog.component';

@Component({
	selector: 'aig-tipo-sconto-maggioranza-list-page',
    templateUrl: './tipo-sconto-maggioranza-list-page.component.html',
    styleUrls: ['./tipo-sconto-maggioranza-list-page.component.scss']
})
export class AigTipoScontoMaggioranzaListPageComponent extends GenericComponent {
    constructor(
        private tipoScontoMaggioranzaResourceService: TipoScontoMaggiorazioneResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initTipoScontoMaggioranzaSearch();

		this.showAllTipoScontoMaggioranza();
	}

	reloadPage() {
		this.showAllTipoScontoMaggioranza();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	tipoScontoMaggioranzaDTOs: TipoScontoMaggiorazioneDTO[];
    tipoScontoMaggioranzaDC: string[];
	tipoScontoMaggioranzaError: any;

    tipoScontoMaggioranzaSearchFormGroup: FormGroup;
	tipoScontoMaggioranzaFilters: any;

	tipoScontoMaggioranzaPaginationSize: number;
	tipoScontoMaggioranzaLength: number;

    
    private initTipoScontoMaggioranzaSearch() {
		this.tipoScontoMaggioranzaPaginationSize = 10;

		this.tipoScontoMaggioranzaSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.tipoScontoMaggioranzaDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersTipoScontoMaggioranza() {
		this.tipoScontoMaggioranzaFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchTipoScontoMaggioranza(page: number) {
		this.tipoScontoMaggioranzaDTOs = null;

		this.tipoScontoMaggioranzaFilters.page = page;
		this.tipoScontoMaggioranzaFilters.size = this.tipoScontoMaggioranzaPaginationSize;

		try {                                                                       
			this.tipoScontoMaggioranzaLength = await this.tipoScontoMaggioranzaResourceService.countTipoScontoMaggiorazionesUsingGET(this.tipoScontoMaggioranzaFilters).toPromise();  
			
			if(this.tipoScontoMaggioranzaLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoScontoMaggioranzaDTOs = [];
				return;
			}

			this.tipoScontoMaggioranzaDTOs = await this.tipoScontoMaggioranzaResourceService.getAllTipoScontoMaggiorazionesUsingGET(this.tipoScontoMaggioranzaFilters).toPromise();
		} catch (e) {
			this.tipoScontoMaggioranzaError = e;
		}
	}
	
    
    showAllTipoScontoMaggioranza() {
		this.resetFiltersTipoScontoMaggioranza()
    }
    
    resetFiltersTipoScontoMaggioranza() {
		this.tipoScontoMaggioranzaSearchFormGroup.reset();
		this.clearFiltersTipoScontoMaggioranza();
		this.searchTipoScontoMaggioranza(0);
    }
    
    tipoScontoMaggioranzaPaginationEvent(pageEvent: PageEvent) {
		this.tipoScontoMaggioranzaPaginationSize = pageEvent.pageSize;
		this.searchTipoScontoMaggioranza(pageEvent.pageIndex);
	}

    tipoScontoMaggioranzaSearchWithFilter() {
		let searchedId = this.tipoScontoMaggioranzaSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTipoScontoMaggioranza();
			this.tipoScontoMaggioranzaSearchFormGroup.reset();
			this.tipoScontoMaggioranzaFilters.idEquals = searchedId;
			this.searchTipoScontoMaggioranza(0);
			return;
		}

		this.tipoScontoMaggioranzaFilters.idEquals = null;

		this.tipoScontoMaggioranzaFilters.nameContains = this.tipoScontoMaggioranzaSearchFormGroup.controls.name.value;

		this.searchTipoScontoMaggioranza(0);
	}

    newTipoScontoMaggioranza(){
        this.dialog.open(AigTipoScontMaggioranzaNewUpdateDialogComponent, { data: { tipoScontoMaggioranza: {} } });
    }
    //			---- !TABLE AND SEARCH SECTION ----
}