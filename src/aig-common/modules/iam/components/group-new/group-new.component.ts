import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContextGroupDTO, ContextGroupResourceService } from 'api-gest';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-group-new',
    templateUrl: './group-new.component.html',
    styleUrls: ['./group-new.component.scss']
})
export class AigGroupNewComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private contextGroupResourceService: ContextGroupResourceService,
        private eventService: EventService,
    ) { }

    private formGroup: FormGroup;
    private step: any = {
        form: true,
        loading: false,
        complete: false
    };
    public contextGroup: ContextGroupDTO;

    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            name: ['', Validators.required]
        })
    }







    submit() {
        if (!this.formGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let contextGroup: ContextGroupDTO = {
            name: this.formGroup.value.name
        };

        this.contextGroupResourceService.createContextGroupUsingPOST(contextGroup).subscribe(
            (value: ContextGroupDTO) => {
                this.eventService.reloadCurrentPage();
                this.contextGroup = value;
                this._snackBar.open("Group: " + value.name + " created.", null, {duration: 2000,});
                this._fuseProgressBarService.hide();
                this.setStep("complete");
            },
            (error: any) => {
                this._snackBar.open("Error: " + error.error.detail, null, {duration: 5000,});

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
