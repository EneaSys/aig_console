import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { WarehouseHandlingDTO, WarehouseHandlingItemDTO, WarehouseHandlingResourceService } from 'aig-commerce';
import { AigAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigCommerceAutocompleteService } from '../../service/autocomplete-filter.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { cloneDeep } from 'lodash';


@Component({
    selector: 'aig-warehouse-handling-form-complex',
    templateUrl: './warehouse-handling-form-complex.component.html',
    styleUrls: ['./warehouse-handling-form-complex.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class AigWarehouseHandlingFormComplexComponent implements OnInit {
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

    warehouseHandling: WarehouseHandlingDTO;

	warehouseHandlingIsCompleted: boolean = false;

	warehouseHandlingItemDTOs: any[] = [];


    ngOnInit(): void {
    }

	checkStep1(stepper: any) {
		if( !(this.warehouseHandling && this.warehouseHandling.warehouseHandlingType) ) {
			//error
			return;
		}

		this.warehouseHandlingIsCompleted = true;
		setTimeout(() => { stepper.next(); }, 1);
	}

	addIn(warehouseHandlingItemDTO: WarehouseHandlingItemDTO) {
		let warehouseHandlingItemDTOs = cloneDeep(this.warehouseHandlingItemDTOs);
		warehouseHandlingItemDTOs.push(warehouseHandlingItemDTO);
		this.warehouseHandlingItemDTOs = warehouseHandlingItemDTOs;
	}

    async confirmation() {

        this._fuseProgressBarService.show();

        
        this._fuseProgressBarService.hide();
    }

    newWarehouseHandling() {
        this.setStep("form");
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
