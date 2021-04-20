import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { CityDTO, CityResourceService, ModalitaPagamentoDTO, ModalitaPagamentoResourceService, NaturaDTO, NaturaResourceService, TipoCassaDTO, TipoCassaResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-modalita-pagamento-new-update-form',
    templateUrl: './modalita-pagamento-new-update-form.component.html',
    styleUrls: ['./modalita-pagamento-new-update-form.component.scss']
})
export class AigModalitaPagamentoNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private modalitaPagamentoResourceService: ModalitaPagamentoResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    modalitaPagamento: ModalitaPagamentoDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	modalitaPagamentoOutput = new EventEmitter<ModalitaPagamentoDTO>();

    modalitaPagamentoNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.modalitaPagamentoNewUpdateForm = this._formBuilder.group({
            id:[''],
            value: ['', Validators.required],
            description: [''],

        })
        if (this.modalitaPagamento!= null) {
            this.modalitaPagamentoNewUpdateForm.patchValue(this.modalitaPagamento);
        }
    }
    async submit() {
        if (!this.modalitaPagamentoNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let modalitaPagamento: ModalitaPagamentoDTO = this.modalitaPagamentoNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (modalitaPagamento.id != 0) {
                await this.modalitaPagamentoResourceService.updateModalitaPagamentoUsingPUT(modalitaPagamento).toPromise();
                postOrPut = "updated";
            } else {
                await this.modalitaPagamentoResourceService.createModalitaPagamentoUsingPOST(modalitaPagamento).toPromise();
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

    newModalitaPagamento() {
        this.modalitaPagamento = null;
        this.modalitaPagamentoOutput.emit(this.modalitaPagamento);
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}