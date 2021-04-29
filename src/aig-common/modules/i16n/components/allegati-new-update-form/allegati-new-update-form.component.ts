import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { FatturaElettronicaBodyDTO, AllegatiResourceService, AllegatiDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigI16nAutocompleteFilterService } from '../../service/autocomplete-filter.service';
import { AigI16nAutocompleteDisplayService } from '../../service/autocomplete-function.service';

@Component({
    selector: 'aig-allegati-new-update-form',
    templateUrl: './allegati-new-update-form.component.html',
    styleUrls: ['./allegati-new-update-form.component.scss']
})
export class AigAllegatiNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private allegatiResourceService: AllegatiResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private genericAutocompleteFilterService: AigI16nAutocompleteFilterService,
        public i16nAutoCompleteDisplayService: AigI16nAutocompleteDisplayService,
    ) { }

    @Input()
    allegati: AllegatiDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	allegatiOutput = new EventEmitter<AllegatiDTO>();

    allegatiNewUpdateForm: FormGroup;

    filteredFatturaElettronicaBody: Observable<FatturaElettronicaBodyDTO[]>;

    ngOnInit(): void {
        this.allegatiNewUpdateForm = this._formBuilder.group({
            id: [''],
            fatturaElettronicaBody: ['', [Validators.required, AigValidator.haveId]],
        })
        if (this.allegati != null) {
            this.allegatiNewUpdateForm.patchValue(this.allegati);
        }

        this.filteredFatturaElettronicaBody = this.genericAutocompleteFilterService.filterFatturaElettronicaBody(this.allegatiNewUpdateForm.controls['fatturaElettronicaBody'].valueChanges);
    }

    async submit() {
        if (!this.allegatiNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let allegati: AllegatiDTO = this.allegatiNewUpdateForm.value;

        if(this.returnToParent) {
			this.allegatiOutput.emit(allegati);
			this.setStep("complete");
		} 

        if(!this.returnToParent){
            try {
                let postOrPut;
                if (allegati.id != 0) {
                    await this.allegatiResourceService.updateAllegatiUsingPUT(allegati).toPromise();
                    postOrPut = "updated";
                } else {
                    await this.allegatiResourceService.createAllegatiUsingPOST(allegati).toPromise();
                    postOrPut = "created";
                }
                this.eventService.reloadCurrentPage();
    
                this._snackBar.open(`Allegati: '${allegati.id}' ${postOrPut}.`, null, { duration: 2000, });
                this.setStep("complete");
            } catch (error) {
                this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
                this.setStep("form");
            }
        }
        
        this._fuseProgressBarService.hide();
    }

    newAllegati() {
        this.allegati = null;
        this.allegatiOutput.emit(this.allegati);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}