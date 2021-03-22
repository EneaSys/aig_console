import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseDTO, WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'aig-warehouse-handling-new-update-form',
    templateUrl: './warehouse-handling-new-update-form.component.html',
    styleUrls: ['./warehouse-handling-new-update-form.component.scss'],
})
export class AigWarehouseHandlingNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
        private eventService: EventService,
        private commerceAutocompleteService: AigCommerceAutocompleteService,
    ) { }

    @Input()
    warehouseHandling: WarehouseHandlingDTO;

	@Input()
	returnToParent: boolean = false;

	@Output()
	wareHouseHandlingOutput = new EventEmitter<WarehouseHandlingDTO>();

	isUpdate: boolean = false;
	

    filteredWarehouseToLoad: Observable<WarehouseDTO[]>;
    filteredWarehouseToUnload: Observable<WarehouseDTO[]>;

    warehouseHandlingItemDTOs: WarehouseHandlingItemDTO[] = [];

    handlingTypeRequirementIsCompleted = false;
    dateRequirementIsCompleted = false;

    warehouseHandlingFormGroup: FormGroup;


    ngOnInit(): void {


        this.warehouseHandlingFormGroup = this._formBuilder.group({
            id: [""],
            warehouseHandlingType: ['', Validators.required],
            warehouseToLoad: [''],
            warehouseToUnload: [''],
            date: ['', Validators.required]
        });

        if (this.warehouseHandling != null) {
            this.isUpdate = true;
            this.warehouseHandlingFormGroup.patchValue(this.warehouseHandling);
        }

        this.filteredWarehouseToLoad = this.commerceAutocompleteService.filterWarehouse(this.warehouseHandlingFormGroup.controls['warehouseToLoad'].valueChanges);
        this.filteredWarehouseToUnload = this.commerceAutocompleteService.filterWarehouse(this.warehouseHandlingFormGroup.controls['warehouseToUnload'].valueChanges);
    }

    async submit() {
        if (!this.warehouseHandlingFormGroup.valid) {
            return;
        }
        

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouseHandling: WarehouseHandlingDTO = {
            id: this.warehouseHandlingFormGroup.controls.id.value,
            warehouseHandlingType: this.warehouseHandlingFormGroup.controls.warehouseHandlingType.value,
            warehouseToLoadId: this.warehouseHandlingFormGroup.controls.warehouseToLoad.value.id ? this.warehouseHandlingFormGroup.controls.warehouseToLoad.value.id : null,
            warehouseToUnloadId: this.warehouseHandlingFormGroup.controls.warehouseToUnload.value.id ? this.warehouseHandlingFormGroup.controls.warehouseToUnload.value.id : null,
            date: this.warehouseHandlingFormGroup.controls.date.value,
        }

		if(this.warehouseHandlingFormGroup.controls.warehouseHandlingType.value != 'UNLOAD') {
			warehouseHandling.warehouseToLoadId = this.warehouseHandlingFormGroup.controls.warehouseToLoad.value.id;
			warehouseHandling.warehouseToLoad = this.warehouseHandlingFormGroup.controls.warehouseToLoad.value;
		}

		if(this.warehouseHandlingFormGroup.controls.warehouseHandlingType.value != 'LOAD') {
			warehouseHandling.warehouseToUnloadId = this.warehouseHandlingFormGroup.controls.warehouseToUnload.value.id;
				warehouseHandling.warehouseToUnload = this.warehouseHandlingFormGroup.controls.warehouseToUnload.value;
		}
		

		if(this.returnToParent) {
			this.wareHouseHandlingOutput.emit(warehouseHandling);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut;
				if (warehouseHandling.id != 0) {
					await this.warehouseHandlingResourceService.updateWarehouseHandlingUsingPUT(warehouseHandling).toPromise();
					postOrPut = "updated";
				} else {
					await this.warehouseHandlingResourceService.createWarehouseHandlingUsingPOST(warehouseHandling).toPromise();
					postOrPut = "created";
				}
				this.eventService.reloadCurrentPage();
	
				this._snackBar.open(`Ipp Warehouse Handling: '${warehouseHandling.id}' ${postOrPut}.`, null, { duration: 2000, });
				this.setStep("complete");
			} catch (e) {
				this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

        this._fuseProgressBarService.hide();
    }
    

    newWarehouseHandling() {
		this.warehouseHandling = null;
		this.wareHouseHandlingOutput.emit(this.warehouseHandling);
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
