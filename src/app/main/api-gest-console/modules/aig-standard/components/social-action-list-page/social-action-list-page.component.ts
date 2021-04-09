import { Component } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { SocialActionResourceService, SocialActionDTO } from 'aig-standard';
import { MatDialog } from '@angular/material/dialog';
import { AigSocialActionNewUpdateModalComponent } from '../social-action-new-update-modal/social-action-new-update-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
    selector: 'aig-social-action-list-page',
    templateUrl: './social-action-list-page.component.html',
    styleUrls: ['./social-action-list-page.component.scss']
})
export class AigSocialActionListPageComponent extends GenericComponent {
    constructor(
        private socialActionResourceService: SocialActionResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
		private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initSocialActionSearch();

		this.showAllSocialAction();
	}

	reloadPage() {
		this.showAllSocialAction();
	}

    //			---- SOCIAL ACTION TABLE AND SEARCH SECTION ----
    
	socialActionDTOs: SocialActionDTO[];
    socialActionDC: string[];
	socialActionError: any;

    socialActionSearchFormGroup: FormGroup;
	socialActionFilters: any;

	socialActionPaginationSize: number;
	socialActionLength: number;

    
    private initSocialActionSearch() {
		this.socialActionPaginationSize = 10;

		this.socialActionSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
			code: [''],
		});

		this.socialActionDC = ['id', 'code', 'name','wikiCode', 'buttons'];
    }
    
    private clearFiltersSocialAction() {
		this.socialActionFilters = {
			idEquals: null,
			nameContains: null,
			codeEquals: null,
			page: 0,
		}
    }
    
    private async searchSocialAction(page: number) {
		this.socialActionDTOs = null;

		this.socialActionFilters.page = page;
		this.socialActionFilters.size = this.socialActionPaginationSize;

		try {
			this.socialActionLength = await this.socialActionResourceService.countSocialActionsUsingGET().toPromise();

			if(this.socialActionLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.socialActionDTOs = [];
				return;
			}

			this.socialActionDTOs = await this.socialActionResourceService.getAllSocialActionsUsingGET().toPromise();
		} catch (e) {
			this.socialActionError = e;
		}
    }
    
    showAllSocialAction() {
		this.resetFiltersSocialAction()
    }
    
    resetFiltersSocialAction() {
		this.socialActionSearchFormGroup.reset();
		this.clearFiltersSocialAction();
		this.searchSocialAction(0);
    }
    
    socialActionPaginationEvent(pageEvent: PageEvent) {
		this.socialActionPaginationSize = pageEvent.pageSize;
		this.searchSocialAction(pageEvent.pageIndex);
	}

    socialActionSearchWithFilter() {
		let searchedId = this.socialActionSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersSocialAction();
			this.socialActionSearchFormGroup.reset();
			this.socialActionFilters.idEquals = searchedId;
			this.searchSocialAction(0);
			return;
		}

		this.socialActionFilters.idEquals = null;

		this.socialActionFilters.nameContains = this.socialActionSearchFormGroup.controls.name.value;

		this.searchSocialAction(0);
	}

    newAction(){
        this.dialog.open(AigSocialActionNewUpdateModalComponent, { data: { socialAction: {} } });
    }
    //			---- !SOCIAL ACTION TABLE AND SEARCH SECTION ----
}