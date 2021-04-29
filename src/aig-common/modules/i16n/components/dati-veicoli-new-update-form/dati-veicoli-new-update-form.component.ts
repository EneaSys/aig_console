import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { DatiPagamentoDTO, DatiPagamentoResourceService, DatiVeicoliDTO, DatiVeicoliResourceService, DettaglioPagamentoDTO, DettaglioPagamentoResourceService, FatturaElettronicaBodyDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigI16nAutocompleteFilterService } from '../../service/autocomplete-filter.service';
import { AigI16nAutocompleteDisplayService } from '../../service/autocomplete-function.service';

@Component({
    selector: 'aig-dati-veicoli-new-update-form',
    templateUrl: './dati-veicoli-new-update-form.component.html',
    styleUrls: ['./dati-veicoli-new-update-form.component.scss']
})
export class AigDatiVeicoliNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private datiVeicoliResourceService: DatiVeicoliResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private genericAutocompleteFilterService: AigI16nAutocompleteFilterService,
        public i16nAutoCompleteDisplayService: AigI16nAutocompleteDisplayService,
    ) { }

    @Input()
    datiVeicoli: DatiVeicoliDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	datiVeicoliOutput = new EventEmitter<DatiVeicoliDTO>();

    datiVeicoliNewUpdateForm: FormGroup;

    filteredFatturaElettronicaBody: Observable<FatturaElettronicaBodyDTO[]>;

    ngOnInit(): void {
        this.datiVeicoliNewUpdateForm = this._formBuilder.group({
            id: [''],
            fatturaElettronicaBody: ['', [Validators.required, AigValidator.haveId]],
        })
        if (this.datiVeicoli != null) {
            this.datiVeicoliNewUpdateForm.patchValue(this.datiVeicoli);
        }

        this.filteredFatturaElettronicaBody = this.genericAutocompleteFilterService.filterFatturaElettronicaBody(this.datiVeicoliNewUpdateForm.controls['fatturaElettronicaBody'].valueChanges);
    }

    async submit() {
        if (!this.datiVeicoliNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let datiVeicoli: DatiVeicoliDTO = this.datiVeicoliNewUpdateForm.value;

        if(this.returnToParent) {
			this.datiVeicoliOutput.emit(datiVeicoli);
			this.setStep("complete");
		} 

        if(!this.returnToParent){
            try {
                let postOrPut;
                if (datiVeicoli.id != 0) {
                    await this.datiVeicoliResourceService.updateDatiVeicoliUsingPUT(datiVeicoli).toPromise();
                    postOrPut = "updated";
                } else {
                    await this.datiVeicoliResourceService.createDatiVeicoliUsingPOST(datiVeicoli).toPromise();
                    postOrPut = "created";
                }
                this.eventService.reloadCurrentPage();
    
                this._snackBar.open(`Dati Veicoli: '${datiVeicoli.id}' ${postOrPut}.`, null, { duration: 2000, });
                this.setStep("complete");
            } catch (error) {
                this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
                this.setStep("form");
            }
        }
        
        this._fuseProgressBarService.hide();
    }

    newDatiVeicoli() {
        this.datiVeicoli = null;
        this.datiVeicoliOutput.emit(this.datiVeicoli);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}