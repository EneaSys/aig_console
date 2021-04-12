import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialResourceService, SocialDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigSocialNewUpdateModalComponent } from '../social-new-update-modal/social-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-social-list-page',
    templateUrl: './social-list-page.component.html',
    styleUrls: ['./social-list-page.component.scss']
})
export class AigSocialListPageComponent extends GenericComponent {
    constructor(
        private socialResourceService: SocialResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initSocialSearch();

		this.showAllSocial();
	}

	reloadPage() {
		this.showAllSocial();
	}

    //			---- SOCIAL TABLE AND SEARCH SECTION ----
    
	socialDTOs: SocialDTO[];
    socialDC: string[];
	socialError: any;

    socialSearchFormGroup: FormGroup;
	socialFilters: any;

	socialPaginationSize: number;
	socialLength: number;

    
    private initSocialSearch() {
		this.socialPaginationSize = 10;

		this.socialSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.socialDC = ['id', 'code', 'name', 'wikiCode', 'buttons'];
    }
    
    private clearFiltersSocial() {
		this.socialFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchSocial(page: number) {
		this.socialDTOs = null;

		this.socialFilters.page = page;
		this.socialFilters.size = this.socialPaginationSize;

		try {
			this.socialLength = await this.socialResourceService.countSocialsUsingGET().toPromise();

			if(this.socialLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.socialDTOs = [];
				return;
			}

			this.socialDTOs = await this.socialResourceService.getAllSocialsUsingGET().toPromise();
		} catch (e) {
			this.socialError = e;
		}
    }
    
    showAllSocial() {
		this.resetFiltersSocial()
    }
    
    resetFiltersSocial() {
		this.socialSearchFormGroup.reset();
		this.clearFiltersSocial();
		this.searchSocial(0);
    }
    
    socialPaginationEvent(pageEvent: PageEvent) {
		this.socialPaginationSize = pageEvent.pageSize;
		this.searchSocial(pageEvent.pageIndex);
	}

    socialSearchWithFilter() {
		let searchedId = this.socialSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersSocial();
			this.socialSearchFormGroup.reset();
			this.socialFilters.idEquals = searchedId;
			this.searchSocial(0);
			return;
		}

		this.socialFilters.idEquals = null;

		this.socialFilters.nameContains = this.socialSearchFormGroup.controls.name.value;

		this.searchSocial(0);
	}

    newSocial(): void {
        this.dialog.open(AigSocialNewUpdateModalComponent, { data: { social: {} } });
    }
    //			---- !SOCIAL TABLE AND SEARCH SECTION ----
}