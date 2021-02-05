import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { PaymentDTO, PaymentResourceService } from 'aig-commerce';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { AigPaymentNewUpdateModalComponent } from '../payment-new-update-modal-component/payment-new-update-modal.component';

@Component({
    selector: 'aig-payment-list-page',
    templateUrl: './payment-list-page.component.html',
    styleUrls: ['./payment-list-page.component.scss']
})
export class AigPaymentListPageComponent extends GenericComponent {
	constructor(
		private paymentResourceService: PaymentResourceService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    loadPage() {
		this.initPaymentSearch();

		this.showAllPayment();
	}

	reloadPage() {
		this.showAllPayment();
    }
    
    //			---- PAYMENT TABLE AND SEARCH SECTION ----

    paymentSearchFormGroup: FormGroup;
	paymentPagination: any;
	paymentFilters: any;

	paymentLength: number;
	paymentDTOs: PaymentDTO[];
	paymentError: any;

    paymentDC: string[];
    
    private initPaymentSearch() {
		this.paymentPagination = {
			size: 10,
			page: 0
		}
	
		this.paymentSearchFormGroup = this._formBuilder.group({
			id: [''],
			name: [''],
		});

		this.paymentDC = ["id", "valuePaperPayment","paymentMethod","buttons"];
    }
    
    private clearFiltersPayment() {
		this.paymentFilters = {
			id: null,
		}
	}

	private async searchPayment(page: number) {
		this.paymentPagination.page = page;
		this.paymentDTOs = null;
		try {
			this.paymentLength = await this.paymentResourceService.countPaymentsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.paymentFilters.id).toPromise();
			
			if(this.paymentLength == 0) {
				this._snackBar.open("Nessun valore trovato con questi parametri!", null, {duration: 2000,});
				this.paymentDTOs = [];
				return;
			}

			this.paymentDTOs = await this.paymentResourceService.getAllPaymentsUsingGET(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.paymentFilters.id,null,null,null,null,null,null,null,null,this.paymentPagination.page,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,this.paymentPagination.size).toPromise();
		} catch (e) {
			this.paymentError = e;
		}
	}

	showAllPayment() {
		this.resetFiltersPayment();
	}

	resetFiltersPayment() {
		this.paymentSearchFormGroup.reset();
		this.clearFiltersPayment();
		this.searchPayment(0);
	}

	paymentPaginationEvent(pageEvent: PageEvent) {
		this.paymentPagination.size = pageEvent.pageSize;
		this.searchPayment(pageEvent.pageIndex);
	}

	paymentSearchWithFilter() {
		let searchedId = this.paymentSearchFormGroup.controls.id.value;

		if(searchedId != null) {
			this.clearFiltersPayment();
			this.paymentSearchFormGroup.reset();
			this.paymentFilters.id = searchedId;
			this.searchPayment(0);
			return;
		}
		this.paymentFilters.id = null;

		this.searchPayment(0);
	}

	newPayment(): void {
		this.dialog.open(AigPaymentNewUpdateModalComponent, { data: { payment: {} } });
   
    }
	//			---- !PRODUCER SECTION ----

	
}
