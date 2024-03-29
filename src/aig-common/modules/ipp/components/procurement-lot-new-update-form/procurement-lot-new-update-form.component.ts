import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigStandardAutocompleteFilterService } from 'aig-common/modules/standard/services/autocomplete-filter.service';
import { AigStandardAutocompleteDisplayService } from 'aig-common/modules/standard/services/autocomplete-function.service';

import { ProcurementDTO, ProcurementLotDTO, ProcurementLotResourceService,  } from 'aig-italianlegislation';
import { CityDTO, CpvDTO, IlPpProcurementLotAwardCriterionDTO, IlPpProcurementLotCategoryDTO, IlPpProcurementLotStatusDTO, IlPpProcurementLotTypeDTO, IlPpProcurementModalityDTO, IlPpProcurementProcedureDTO, IlPpProcurementSectorDTO } from 'aig-standard';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

import { locale as italian } from '../../i18n/it';
import { locale as english } from '../../i18n/en';

@Component({
    selector: 'aig-procurement-lot-new-update-form',
    templateUrl: './procurement-lot-new-update-form.component.html',
    styleUrls: ['./procurement-lot-new-update-form.component.scss']
})
export class AigProcurementLotNewUpdateFormComponent implements OnInit {

	@Input()
    procurementLot: ProcurementLotDTO;

	@Input()
    notSubmit: boolean = false;
	@Output()
	procurementLotChange = new EventEmitter<ProcurementLotDTO>();

    @Input()
    procurement: ProcurementDTO;

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private procurementLotResourceService: ProcurementLotResourceService,
        
        private standardAutocompleteFilterService : AigStandardAutocompleteFilterService,
        public standardAutocompleteDisplayService : AigStandardAutocompleteDisplayService,
        
        private ippAutocompleteFilterService : AigIppAutocompleteService,
        public ippAutocompleteDisplayService : AigIppAutocompleteDisplayService,
        
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private eventService: EventService,
    ) {
        this._fuseTranslationLoaderService.loadTranslations(italian, english);
    }



    procurementLotNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    procurementLotResult: any;

    filteredProcurement: Observable<ProcurementDTO[]>;
    filteredCpv: Observable<CpvDTO[]>;
    filteredIppLotType: Observable<IlPpProcurementLotTypeDTO[]>;
    filteredIppLotCategory: Observable<IlPpProcurementLotCategoryDTO[]>;
    filteredProcurementLotAwardCriterion: Observable<IlPpProcurementLotAwardCriterionDTO[]>;
    filteredProcurementLotStatus: Observable<IlPpProcurementLotStatusDTO[]>;
	filteredIppProcedure: Observable<IlPpProcurementProcedureDTO[]>;
    filteredIppSector: Observable<IlPpProcurementSectorDTO[]>;
    filteredIppModality: Observable<IlPpProcurementModalityDTO[]>;
	filteredLocality: Observable<CityDTO[]>;




    ngOnInit(): void {
        this.procurementLotNewUpdateForm = this._formBuilder.group({
            id: [null],
            
            procurement: [this.procurement, [Validators.required, AigValidator.haveId] ],
			
			type: [null, [Validators.required, AigValidator.haveCode] ],
            awardCriterion: [null, [Validators.required, AigValidator.haveCode] ],
			sector: ['', [Validators.required, AigValidator.haveCode]],
            procedure: ['', [Validators.required, AigValidator.haveCode]],
            modality: ['', [Validators.required, AigValidator.haveCode]],
			cpv: [null, [AigValidator.haveCode]],

            status: [null, [Validators.required, AigValidator.haveCode] ],
			
            description: [null, Validators.required],
            offerExpiryDate: [null, Validators.required],
            baseAmount: [null, Validators.required],

			candidacy: [false],
			
			cig: [null, Validators.required],
			workLocation: [null, AigValidator.haveCode],

            securityAmount: [null],
			istatCode: [null],
            nutsCode: [null],
        })
        
        if (this.procurementLot != null) {
            this.procurementLotNewUpdateForm.patchValue(this.procurementLot);
            this.isUpdate = true;
			this.candidacyChecked(this.procurementLot.candidacy);
        }

        this.filteredProcurement = this.ippAutocompleteFilterService.filterProcurement(this.procurementLotNewUpdateForm.controls['procurement'].valueChanges);
        
        this.filteredCpv = this.standardAutocompleteFilterService.filterCpv(this.procurementLotNewUpdateForm.controls['cpv'].valueChanges);
        this.filteredIppLotType = this.standardAutocompleteFilterService.filterIppLotType(this.procurementLotNewUpdateForm.controls['type'].valueChanges);
        this.filteredProcurementLotAwardCriterion = this.standardAutocompleteFilterService.filterIlPpProcurementLotAwardCriterion(this.procurementLotNewUpdateForm.controls['awardCriterion'].valueChanges);
        this.filteredProcurementLotStatus = this.standardAutocompleteFilterService.filterIlPpProcurementLotStatus(this.procurementLotNewUpdateForm.controls['status'].valueChanges);
		this.filteredLocality = this.standardAutocompleteFilterService.filterCity(this.procurementLotNewUpdateForm.controls['workLocation'].valueChanges);
		this.filteredIppProcedure = this.standardAutocompleteFilterService.filterIppProcedure(this.procurementLotNewUpdateForm.controls['procedure'].valueChanges);
        this.filteredIppSector = this.standardAutocompleteFilterService.filterIppSector(this.procurementLotNewUpdateForm.controls['sector'].valueChanges);
        this.filteredIppModality = this.standardAutocompleteFilterService.filterIppModality(this.procurementLotNewUpdateForm.controls['modality'].valueChanges);
    }

	candidacyChecked(isCandidacy: boolean) {
		let cigFormControl: AbstractControl = this.procurementLotNewUpdateForm.controls['cig'];
		if(isCandidacy) {
			cigFormControl.clearValidators();
		} else {
			cigFormControl.setValidators([Validators.required])
		}
		cigFormControl.updateValueAndValidity();
	}

	descriptionFromProcurement() {
		let descriptionFormControl: AbstractControl = this.procurementLotNewUpdateForm.controls['description'];
		descriptionFormControl.setValue(this.procurementLotNewUpdateForm.value.procurement.description);
		descriptionFormControl.updateValueAndValidity();
	}

	submitError: string = undefined;

    async submit() {
        if (!this.procurementLotNewUpdateForm.valid) {
            return;
        }
		let procurementLot: any = { ...this.procurementLotNewUpdateForm.value };
		{
			console.log(this.procurementLotNewUpdateForm.value.procurement);
			procurementLot.procurementId = this.procurementLotNewUpdateForm.value.procurement.id;
        
			procurementLot.typeCode = this.procurementLotNewUpdateForm.value.type.code;
			procurementLot.awardCriterionCode = this.procurementLotNewUpdateForm.value.awardCriterion.code;
			procurementLot.procedureCode = this.procurementLotNewUpdateForm.value.procedure.code;
			procurementLot.sectorCode = this.procurementLotNewUpdateForm.value.sector.code;
			procurementLot.modalityCode = this.procurementLotNewUpdateForm.value.modality.code;
	
			procurementLot.statusCode = this.procurementLotNewUpdateForm.value.status.code;
	
			procurementLot.workLocationCode = (this.procurementLotNewUpdateForm.value.workLocation) ? this.procurementLotNewUpdateForm.value.workLocation.code : null;
			procurementLot.cpvCode = (this.procurementLotNewUpdateForm.value.cpv) ? this.procurementLotNewUpdateForm.value.cpv.code : null;
			
			procurementLot.procurement = null;
			procurementLot.type = null;
			procurementLot.awardCriterion = null;
			procurementLot.status = null;
			procurementLot.workLocation = null;
			procurementLot.cpv = null;
		}
		this.procurementLotResult = procurementLot;
		console.log(this.procurementLotResult);

		if(!this.notSubmit) {
			try {
				this._fuseProgressBarService.show();
        		this.setStep("loading");
				this.submitError = undefined;

				let postOrPut: string;
	
				if (this.isUpdate) {
					await this.procurementLotResourceService.updateProcurementLotUsingPUT(procurementLot).toPromise();
					postOrPut = "updated";
				} else {
					await this.procurementLotResourceService.createProcurementLotUsingPOST(procurementLot).toPromise();
					postOrPut = "created";
				}
	
				this.eventService.reloadCurrentPage();
			} catch (e) {
				this.submitError = "Error: " + e.error.title;
				this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
			} finally {
				this._fuseProgressBarService.hide();
			}
		}
		
		this.procurementLotChange.emit(this.procurementLotResult);
		this.setStep("complete");
    }

    newProcurementLot() {
        this.setStep("form");
    }

	step: any = {
        form: true,
        loading: false,
        complete: false
    };
    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}
