import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { CityResourceService, CityDTO, NaturaResourceService, NaturaDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigCityNewUpdateModalComponent } from '../city-new-update-modal/city-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';
import { AigNaturaNewUpdateDialogComponent } from '../natura-new-update-dialog/natura-new-update-dialog.component';

@Component({
	selector: 'aig-natura-list-page',
    templateUrl: './natura-list-page.component.html',
    styleUrls: ['./natura-list-page.component.scss']
})
export class AigNaturaListPageComponent extends GenericComponent {
    constructor(
        private naturaResourceService: NaturaResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initNaturaSearch();

		this.showAllNatura();
	}

	reloadPage() {
		this.showAllNatura();
	}

    //			---- TABLE AND SEARCH SECTION ----
    
	naturaDTOs: NaturaDTO[];
    naturaDC: string[];
	naturaError: any;

    naturaSearchFormGroup: FormGroup;
	naturaFilters: any;

	naturaPaginationSize: number;
	naturaLength: number;

    
    private initNaturaSearch() {
		this.naturaPaginationSize = 10;

		this.naturaSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.naturaDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersNatura() {
		this.naturaFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }

	
    
    private async searchNatura(page: number) {
		this.naturaDTOs = null;

		this.naturaFilters.page = page;
		this.naturaFilters.size = this.naturaPaginationSize;


    
            try {                                                                       
                this.naturaLength = await this.naturaResourceService.countNaturasUsingGET(this.naturaFilters).toPromise();  
                
                if(this.naturaLength == 0) {
                    this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
                    this.naturaDTOs = [];
                    return;
                }
    
                this.naturaDTOs = await this.naturaResourceService.getAllNaturasUsingGET(this.naturaFilters).toPromise();
            } catch (e) {
                this.naturaError = e;
            }
        }
        
    
    showAllNatura() {
		this.resetFiltersNatura()
    }
    
    resetFiltersNatura() {
		this.naturaSearchFormGroup.reset();
		this.clearFiltersNatura();
		this.searchNatura(0);
    }
    
    naturaPaginationEvent(pageEvent: PageEvent) {
		this.naturaPaginationSize = pageEvent.pageSize;
		this.searchNatura(pageEvent.pageIndex);
	}

    naturaSearchWithFilter() {
		let searchedId = this.naturaSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersNatura();
			this.naturaSearchFormGroup.reset();
			this.naturaFilters.idEquals = searchedId;
			this.searchNatura(0);
			return;
		}

		this.naturaFilters.idEquals = null;

		this.naturaFilters.nameContains = this.naturaSearchFormGroup.controls.name.value;

		this.searchNatura(0);
	}

    newNatura(){
        this.dialog.open(AigNaturaNewUpdateDialogComponent, { data: { natura: {} } });
    }
    //			---- !CITY TABLE AND SEARCH SECTION ----
}