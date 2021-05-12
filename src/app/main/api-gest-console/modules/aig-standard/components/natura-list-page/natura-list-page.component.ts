import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import {  IlFeNaturaResourceService, IlFeNaturaDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
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
        private naturaResourceService: IlFeNaturaResourceService,
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
    
	naturaDTOs: IlFeNaturaDTO[];
    naturaDC: string[];
	naturaError: any;

    naturaSearchFormGroup: FormGroup;
	naturaFilters: any;

	naturaPaginationSize: number;
	naturaLength: number;

    
    private initNaturaSearch() {
		this.naturaDC = ['id','code', 'name','description','wikiCode', 'buttons'];

		this.naturaPaginationSize = 10;
		

		this.naturaSearchFormGroup = this._formBuilder.group({
			id: [''],
			code: [''],
			description: [''],
			name: [''],
			wikiCode: [''],
			
		});
	}

	private clearFiltersNatura() {
		this.naturaFilters = {
			naturaIDEquals: null,
			naturaNameContains: null,
			page: 0,
		}
	}


	
    
    private async searchNatura(page: number) {
		this.naturaDTOs = null;

		this.naturaFilters.page = page;
		this.naturaFilters.size = this.naturaPaginationSize;


    
            try {                                                                       
                this.naturaLength = await this.naturaResourceService.countIlFeNaturasUsingGET(this.naturaFilters).toPromise();  
                
                if(this.naturaLength == 0) {
                    this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
                    this.naturaDTOs = [];
                    return;
                }
    
                this.naturaDTOs = await this.naturaResourceService.getAllIlFeNaturasUsingGET(this.naturaFilters).toPromise();
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

		this.naturaFilters.naturaIDEquals = null;

		this.naturaFilters.naturaNameContains = this.naturaSearchFormGroup.controls.name.value;

		this.searchNatura(0);
	}

    newNatura(){
        this.dialog.open(AigNaturaNewUpdateDialogComponent, { data: { natura: {} } });
    }
    //			---- !CITY TABLE AND SEARCH SECTION ----
}