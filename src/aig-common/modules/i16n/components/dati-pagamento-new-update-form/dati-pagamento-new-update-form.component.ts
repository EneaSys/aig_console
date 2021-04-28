import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { AigValidator } from 'aig-common/AigValidator';
import { EventService } from 'aig-common/event-manager/event.service';
import { DatiPagamentoDTO, DatiPagamentoResourceService, DettaglioPagamentoDTO, DettaglioPagamentoResourceService, FatturaElettronicaBodyDTO } from 'aig-italianlegislation';
import { Observable } from 'rxjs';
import { AigI16nAutocompleteFilterService } from '../../service/autocomplete-filter.service';
import { AigI16nAutocompleteDisplayService } from '../../service/autocomplete-function.service';

@Component({
    selector: 'aig-dati-pagamento-new-update-form',
    templateUrl: './dati-pagamento-new-update-form.component.html',
    styleUrls: ['./dati-pagamento-new-update-form.component.scss']
})
export class AigDatiPagamentoNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private datiPagamentoResourceService: DatiPagamentoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
        private genericAutocompleteFilterService: AigI16nAutocompleteFilterService,
        public ippAutoCompleteDisplayService: AigI16nAutocompleteDisplayService,
    ) { }

    @Input()
    datiPagamento: DatiPagamentoDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	datiPagamentoOutput = new EventEmitter<DatiPagamentoDTO>();

    datiPagamentoNewUpdateForm: FormGroup;

    filteredFatturaElettronicaBody: Observable<FatturaElettronicaBodyDTO[]>;

    ngOnInit(): void {
        this.datiPagamentoNewUpdateForm = this._formBuilder.group({
            id: [''],
            condizioniPagamento: ['', Validators.required],
            fatturaElettronicaBody: ['', [Validators.required, AigValidator.haveId]],
        })
        if (this.datiPagamento != null) {
            this.datiPagamentoNewUpdateForm.patchValue(this.datiPagamento);
        }

        this.filteredFatturaElettronicaBody = this.genericAutocompleteFilterService.filterFatturaElettronicaBody(this.datiPagamentoNewUpdateForm.controls['fatturaElettronicaBody'].valueChanges);
    }

    async submit() {
        if (!this.datiPagamentoNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let datiPagamento: DatiPagamentoDTO = this.datiPagamentoNewUpdateForm.value;

        if(this.returnToParent) {
			this.datiPagamentoOutput.emit(datiPagamento);
			this.setStep("complete");
		} 

        if(!this.returnToParent){
            try {
                let postOrPut;
                if (datiPagamento.id != 0) {
                    await this.datiPagamentoResourceService.updateDatiPagamentoUsingPUT(datiPagamento).toPromise();
                    postOrPut = "updated";
                } else {
                    await this.datiPagamentoResourceService.createDatiPagamentoUsingPOST(datiPagamento).toPromise();
                    postOrPut = "created";
                }
                this.eventService.reloadCurrentPage();
    
                this._snackBar.open(`Dati Pagamento: '${datiPagamento.id}' ${postOrPut}.`, null, { duration: 2000, });
                this.setStep("complete");
            } catch (error) {
                this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
                this.setStep("form");
            }
        }
        
        this._fuseProgressBarService.hide();
    }

    newDatiPagamento() {
        this.datiPagamento = null;
        this.datiPagamentoOutput.emit(this.datiPagamento);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}