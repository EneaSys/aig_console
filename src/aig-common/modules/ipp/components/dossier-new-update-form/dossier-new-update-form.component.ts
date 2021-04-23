import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { DossierDTO, DossierResourceService, PartecipationDTO, PreparationDTO, ProcurementDTO, ProcurementLotDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigIppAutocompleteDisplayService } from '../../service/autocomplete-display.service';
import { AigIppAutocompleteService } from '../../service/autocomplete-filter.service';

@Component({
    selector: 'aig-dossier-new-update-form',
    templateUrl: './dossier-new-update-form.component.html',
    styleUrls: ['./dossier-new-update-form.component.scss']
})
export class AigDossierNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private dossierResourceService: DossierResourceService,
        private eventService: EventService,
        public ippAutocompleteDisplayService : AigIppAutocompleteDisplayService,
        private ippAutocompleteService :AigIppAutocompleteService,
    ) { }

    @Input()
    dossier: DossierDTO;

    dossierNewUpdateForm: FormGroup;

    filteredProcurementLot: Observable<ProcurementLotDTO[]>;
    filteredProcurement: Observable<ProcurementDTO[]>;
    filteredPartecipation: Observable<PartecipationDTO[]>;
    filteredPreparation: Observable<PreparationDTO[]>;

    ngOnInit(): void {
        this.dossierNewUpdateForm = this._formBuilder.group({
            id:[''],

            
            partecipation: ['', [Validators.required, AigValidator.haveId] ],
            preparation : ['', [Validators.required, AigValidator.haveId] ],
            procurementLot: ['',[Validators.required, AigValidator.haveId] ],
            procurement: ['',[Validators.required, AigValidator.haveId] ],

            description: ['', Validators.required],
            dossierCode: ['', Validators.required],
        
        })
        
        if (this.dossier != null) {
            this.dossierNewUpdateForm.patchValue(this.dossier);
        }
        this.filteredProcurementLot = this.ippAutocompleteService.filterProcurementLot(this.dossierNewUpdateForm.controls['procurementLot'].valueChanges);
        this.filteredProcurement = this.ippAutocompleteService.filterProcurement(this.dossierNewUpdateForm.controls['procurement'].valueChanges);
        this.filteredPartecipation = this.ippAutocompleteService.filterPartecipation(this.dossierNewUpdateForm.controls['partecipation'].valueChanges);
        this.filteredPreparation = this.ippAutocompleteService.filterPreparation(this.dossierNewUpdateForm.controls['preparation'].valueChanges);

    }

    async submit() {
        if (!this.dossierNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let dossier: DossierDTO = this.dossierNewUpdateForm.value;
        dossier.procurementLotId = this.dossierNewUpdateForm.value.procurementLot.id;
        dossier.procurementId = this.dossierNewUpdateForm.value.procurement.id;
        dossier.partecipationId = this.dossierNewUpdateForm.value.partecipation.id;
        dossier.preparationId = this.dossierNewUpdateForm.value.preparation.id;
        
        console.log(this.dossier);
        try {
            let postOrPut: string;

            if (this.dossier.id > 0) {
                await this.dossierResourceService.updateDossierUsingPUT(dossier).toPromise();
                postOrPut = "updated";
            } else {
                await this.dossierResourceService.createDossierUsingPOST(dossier).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newDossier() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}
