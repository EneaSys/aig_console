import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseHandlingDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';
import { Observable } from 'rxjs';
import { type } from 'os';

@Component({
    selector: 'aig-warehouse-handling-new-update-form',
    templateUrl: './warehouse-handling-new-update-form.component.html',
    styleUrls: ['./warehouse-handling-new-update-form.component.scss']
})
export class AigWarehouseHandlingNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    //warehouseHandlings: string[] = ['LOAD', 'SHIFT', 'UNLOAD'];

    constructor(
        public autocompleteDisplayService: AigAutocompleteDisplayService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private commerceAutocompleteService: AigCommerceAutocompleteService,
        private warehouseHandlingResourceService: WarehouseHandlingResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    warehouseHandling: WarehouseHandlingDTO;
    
    warehouseHandlingNewUpdateForm: FormGroup;

    filteredParentCategory: Observable<WarehouseHandlingDTO[]>;

    ngOnInit(): void {
        this.warehouseHandlingNewUpdateForm = this._formBuilder.group({
            id:[''],
            date:[''],
            handlingType:['', Validators.required],
        })
        
        if (this.warehouseHandling != null) {
            this.warehouseHandlingNewUpdateForm.patchValue(this.warehouseHandling);
        }

        // this.filteredParentCategory = this.commerceAutocompleteService.filterInventoryCategory(this.warehouseHandlingNewUpdateForm.controls['parent'].valueChanges);
    }

    async submit() {
        if (!this.warehouseHandlingNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let warehouseHandling: WarehouseHandlingDTO = {
            id: this.warehouseHandlingNewUpdateForm.value.id,
            date: this.warehouseHandlingNewUpdateForm.value.date,
            warehouseHandlingType :this.warehouseHandlingNewUpdateForm.value.handlingType,
        }
        
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
        this._fuseProgressBarService.hide();
    }

    newWarehouseHandling() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
