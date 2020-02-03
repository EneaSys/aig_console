import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import {  ItalianPublicProcurementProcedureResourceService, ItalianPublicProcurementProcedureDTO  } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-procedure-form',
    templateUrl: './ipp-procedure-form.component.html',
    styleUrls: ['./ipp-procedure-form.component.scss']
})
export class AigIppProcedureFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private ippProcedureResourceService: ItalianPublicProcurementProcedureResourceService,
        private eventService: EventService,
    ) { }

    private procedureNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    
    public procedureDTO: ItalianPublicProcurementProcedureDTO;

    ngOnInit(): void {
        this.procedureNewForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['']
        })
    }

    public createProcedure(){
        if (!this.procedureNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let procedureDTO: ItalianPublicProcurementProcedureDTO = {
            name: this.procedureNewForm.value.name,
            code: this.procedureNewForm.value.code,
            wikiCode: this.procedureNewForm.value.wikiCode
        };

        this.ippProcedureResourceService.createItalianPublicProcurementProcedureUsingPOST(procedureDTO).subscribe(
            (value: ItalianPublicProcurementProcedureDTO) => {
                this.procedureDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Cpv: " + value.name + " created.", null, {duration: 2000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.title, null, {duration: 5000,});
                this._fuseProgressBarService.hide();
                this.setStep("form");
            }
        );
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
