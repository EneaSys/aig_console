import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { DettaglioPagamentoDTO, DettaglioPagamentoResourceService } from 'aig-italianlegislation';

@Component({
    selector: 'aig-dettaglio-pagamento-new-update-form',
    templateUrl: './dettaglio-pagamento-new-update-form.component.html',
    styleUrls: ['./dettaglio-pagamento-new-update-form.component.scss']
})
export class AigDettaglioPagamentoNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private dettaglioPagamentoResourceService: DettaglioPagamentoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    dettaglioPagamento: DettaglioPagamentoDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	dettaglioPagamentoOutput = new EventEmitter<DettaglioPagamentoDTO>();

    dettaglioPagamentoNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.dettaglioPagamentoNewUpdateForm = this._formBuilder.group({
            id: [''],
            beneficiario: ['',],
            modalitaPagamentoCode: ['', Validators.required],
            dataRiferimentoTerminiPagamento:[''],
            giorniTerminiPagamento:[''],
            dataScadenzaPagamento:[''],
            importoPagamento:['', Validators.required],
            codUfficioPostale:[''],
            cognomeQuietanzante:[''],
            nomeQuietanzante:[''],
            cfQuietanzante:[''],
            titoloQuietanzante:[''],
            istitutoFinanziario:[''],
            iBAN:[''],
            aBI:[''],
            cAB:[''],
            scontoPagamentoAnticipato:[''],
            dataLimitePagamentoAnticipato:[''],
            penalitaPagamentiRitardati:[''],
            dataDecorrenzaPenale:[''],
            codicePagamento:[''],
        })
        if (this.dettaglioPagamento != null) {
            this.dettaglioPagamentoNewUpdateForm.patchValue(this.dettaglioPagamento);
        }
    }

    async submit() {
        if (!this.dettaglioPagamentoNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let dettaglioPagamento: DettaglioPagamentoDTO = this.dettaglioPagamentoNewUpdateForm.value;

        if(this.returnToParent) {
			this.dettaglioPagamentoOutput.emit(dettaglioPagamento);
			this.setStep("complete");
		} 

        if(!this.returnToParent){
            try {
                let postOrPut;
                if (dettaglioPagamento.id != 0) {
                    await this.dettaglioPagamentoResourceService.updateDettaglioPagamentoUsingPUT(dettaglioPagamento).toPromise();
                    postOrPut = "updated";
                } else {
                    await this.dettaglioPagamentoResourceService.createDettaglioPagamentoUsingPOST(dettaglioPagamento).toPromise();
                    postOrPut = "created";
                }
                this.eventService.reloadCurrentPage();
    
                this._snackBar.open(`Dettaglio Pagamento: '${dettaglioPagamento.id}' ${postOrPut}.`, null, { duration: 2000, });
                this.setStep("complete");
            } catch (error) {
                this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
                this.setStep("form");
            }
        }
        
        this._fuseProgressBarService.hide();
    }

    newDettaglioPagamento() {
        this.dettaglioPagamento = null;
        this.dettaglioPagamentoOutput.emit(this.dettaglioPagamento);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}