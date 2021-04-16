import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO, TipoRitenutaResourceService, TipoRitenutaDTO, TipoCessionePrestazioneResourceService, TipoCessionePrestazioneDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigTipoRitenutaNewUpdateDialogComponent } from '../tipo-ritenuta-new-update-dialog/tipo-ritenuta-new-update-dialog.component';
import { AigTipoCessionePrestazioneNewUpdateDialogComponent } from '../tipo-cessione-prestazione-new-update-dialog/tipo-cessione-prestazione-new-update-dialog.component';

@Component({
	selector: 'aig-tipo-cessione-prestazione-list-page',
    templateUrl: './tipo-cessione-prestazione-list-page.component.html',
    styleUrls: ['./tipo-cessione-prestazione-list-page.component.scss']
})
export class AigTipoCessionePrestazioneListPageComponent extends GenericComponent {
    constructor(
        private tipoCessionePrestazioneResourceService: TipoCessionePrestazioneResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initTipoCessionePrestazioneSearch();

		this.showAllTipoCessionePrestazione();
	}

	reloadPage() {
		this.showAllTipoCessionePrestazione();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	tipoCessionePrestazioneDTOs: TipoCessionePrestazioneDTO[];
    tipoCessionePrestazioneDC: string[];
	tipoCessionePrestazioneError: any;

    tipoCessionePrestazioneSearchFormGroup: FormGroup;
	tipoCessionePrestazioneFilters: any;

	tipoCessionePrestazionePaginationSize: number;
	tipoCessionePrestazioneLength: number;

	private initTipoCessionePrestazioneSearch() {
		this.tipoCessionePrestazioneDC = ["id", "value","description", "buttons"];

		this.tipoCessionePrestazionePaginationSize = 10;
		

		this.tipoCessionePrestazioneSearchFormGroup = this._formBuilder.group({
			id: [''],
			value: [''],
			
		});
	}
    
    private clearFiltersTipoCessionePrestazione() {
		this.tipoCessionePrestazioneFilters = {
			tipoCessionePrestazioneIDEquals: null,
			tipoCessionePrestazioneNameContains: null,
			page: 0,
		}
    }
    
    private async searchTipoCessionePrestazione(page: number) {
		this.tipoCessionePrestazioneDTOs = null;

		this.tipoCessionePrestazioneFilters.page = page;
		this.tipoCessionePrestazioneFilters.size = this.tipoCessionePrestazionePaginationSize;

		try {
			this.tipoCessionePrestazioneLength = await this.tipoCessionePrestazioneResourceService.countTipoCessionePrestazionesUsingGET(this.tipoCessionePrestazioneFilters).toPromise();

			if(this.tipoCessionePrestazioneLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.tipoCessionePrestazioneDTOs = [];
				return;
			}

			this.tipoCessionePrestazioneDTOs = await this.tipoCessionePrestazioneResourceService.getAllTipoCessionePrestazionesUsingGET(this.tipoCessionePrestazioneFilters).toPromise();
		} catch (e) {
			this.tipoCessionePrestazioneError = e;
		}
    }
    
    showAllTipoCessionePrestazione() {
		this.resetFiltersTipoCessionePrestazione()
    }
    
    resetFiltersTipoCessionePrestazione() {
		this.tipoCessionePrestazioneSearchFormGroup.reset();
		this.clearFiltersTipoCessionePrestazione();
		this.searchTipoCessionePrestazione(0);
    }
    
    tipoCessionePrestazionePaginationEvent(pageEvent: PageEvent) {
		this.tipoCessionePrestazionePaginationSize = pageEvent.pageSize;
		this.searchTipoCessionePrestazione(pageEvent.pageIndex);
	}

    tipoCessionePrestazioneSearchWithFilter() {
		let searchedId = this.tipoCessionePrestazioneSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersTipoCessionePrestazione();
			this.tipoCessionePrestazioneSearchFormGroup.reset();
			this.tipoCessionePrestazioneFilters.idEquals = searchedId;
			this.searchTipoCessionePrestazione(0);
			return;
		}

		this.tipoCessionePrestazioneFilters.idEquals = null;

		this.tipoCessionePrestazioneFilters.nameContains = this.tipoCessionePrestazioneSearchFormGroup.controls.name.value;

		this.searchTipoCessionePrestazione(0);
	}

    newTipoCessionePrestazione(): void {
        this.dialog.open(AigTipoCessionePrestazioneNewUpdateDialogComponent, { data: { tipoCessionePrestazione: {} } });
    }
    //			---- !TABLE AND SEARCH SECTION ----
}