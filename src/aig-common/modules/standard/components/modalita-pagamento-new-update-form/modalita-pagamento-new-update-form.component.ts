import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import {IlFePagamentoModalitaDTO, IlFePagamentoModalitaResourceService} from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';
import { AigValidator } from 'aig-common/AigValidator';

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
        private modalitaPagamentoResourceService: IlFePagamentoModalitaResourceService,
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private eventService: EventService,
    ) { }

    @Input()
    modalitaPagamento: IlFePagamentoModalitaDTO;

    @Input()
	returnToParent: boolean = false; 

    @Output()
	modalitaPagamentoOutput = new EventEmitter<IlFePagamentoModalitaDTO>();

    modalitaPagamentoNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.modalitaPagamentoNewUpdateForm = this._formBuilder.group({
            id: [''],
            code: ['', [Validators.required, AigValidator.haveId]],
            name: ['', [Validators.required, AigValidator.haveId]],
            description: [''],
            wikiCode:['']
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

        let modalitaPagamento: IlFePagamentoModalitaDTO = this.modalitaPagamentoNewUpdateForm.value;

        try {
            let postOrPut: string;

            if (modalitaPagamento.id != 0) {
                await this.modalitaPagamentoResourceService.updateIlFePagamentoModalitaUsingPUT(modalitaPagamento).toPromise();
                postOrPut = "updated";
            } else {
                await this.modalitaPagamentoResourceService.createIlFePagamentoModalitaUsingPOST(modalitaPagamento).toPromise();
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