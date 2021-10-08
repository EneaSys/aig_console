import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { ContactDTO, ContactResourceService } from 'aig-generic';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigContactNewUpdateDialogComponent } from '../contact-new-update-dialog/contact-new-update-dialog.component';

@Component({
    selector: 'aig-contact-list-page',
    templateUrl: './contact-list-page.component.html',
    styleUrls: ['./contact-list-page.component.scss']
})
export class AigContactListPageComponent extends GenericComponent {
    constructor(
        private contactResourceService: ContactResourceService,
        private _formBuilder: FormBuilder,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
        this.initContactSearch();

        this.showAllContact();
    }

    reloadPage() {
        this.showAllContact();
    }

    //			---- CONTACT TABLE AND SEARCH SECTION ----

    contactDTOs: ContactDTO[];
    contactDC: string[];
    contactError: any;

    contactSearchFormGroup: FormGroup;
    contactFilters: any;

    contactPaginationSize: number;
    contactLength: number;

    private initContactSearch() {
        this.contactPaginationSize = 10;

        this.contactSearchFormGroup = this._formBuilder.group({
            id: [''],
            referentLastname: [''],
            eopooTaxNumber: [''],
        });

        this.contactDC = ["id", "eopoo", "referent", "contactType", "value", "buttons"];
    }

    private clearFiltersContact() {
        this.contactFilters = {
            idEquals: null,
            page: 0,
        }
    }

    private async searchContact(page: number) {
		this.contactDTOs = null;

		this.contactFilters.page = page;
		this.contactFilters.size = this.contactPaginationSize;

		try {
			this.contactLength = await this.contactResourceService.countContactsUsingGET(this.contactFilters).toPromise();

			if(this.contactLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.contactDTOs = [];
				return;
			}

			this.contactDTOs = await this.contactResourceService.getAllContactsUsingGET(this.contactFilters).toPromise();
		} catch (e) {
			this.contactError = e;
		}
    }

    showAllContact() {
		this.resetFiltersContact()
    }

    resetFiltersContact() {
		this.contactSearchFormGroup.reset();
		this.clearFiltersContact();
		this.searchContact(0);
    }

    contactPaginationEvent(pageEvent: PageEvent) {
		this.contactPaginationSize = pageEvent.pageSize;
		this.searchContact(pageEvent.pageIndex);
	}

    contactSearchWithFilter() {
		let searchedId = this.contactSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersContact();
			this.contactSearchFormGroup.reset();
			this.contactFilters.idEquals = searchedId;
			this.searchContact(0);
			return;
		}

		this.contactFilters.idEquals = null;

		this.searchContact(0);
	}

    newContact() {
        this.dialog.open(AigContactNewUpdateDialogComponent, { data: { } });
    }

    async publish() {
		await this.contactResourceService.publishUsingGET1(this.contactFilters).toPromise();
	}
    //			---- !CONTACT TABLE AND SEARCH SECTION ----
}