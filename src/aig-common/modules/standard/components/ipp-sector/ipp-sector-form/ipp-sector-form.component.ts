import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ItalianPublicProcurementSectorDTO, ItalianPublicProcurementSectorResourceService } from 'aig-standard';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-ipp-sector-form',
    templateUrl: './ipp-sector-form.component.html',
    styleUrls: ['./ipp-sector-form.component.scss']
})
export class AigIppSectorFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private sectorResourceService: ItalianPublicProcurementSectorResourceService,
        private eventService: EventService,
    ) { }

    private sectorNewForm: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public sectorDTO: ItalianPublicProcurementSectorDTO;

    ngOnInit(): void {
        this.sectorNewForm = this._formBuilder.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            wikiCode:['', Validators.required]
        })
    }

    public createSector(){
        if (!this.sectorNewForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let sectorDTO: ItalianPublicProcurementSectorDTO = {
            name: this.sectorNewForm.value.name,
            code: this.sectorNewForm.value.code,
            wikiCode: this.sectorNewForm.value.wikiCode
        };

        this.sectorResourceService.createItalianPublicProcurementSectorUsingPOST(sectorDTO).subscribe(
            (value: ItalianPublicProcurementSectorDTO) => {
                this.sectorDTO = value;

                this.eventService.reloadCurrentPage();
                this._snackBar.open("Ipp Sector: " + value.name + " created.", null, {duration: 2000,});
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
