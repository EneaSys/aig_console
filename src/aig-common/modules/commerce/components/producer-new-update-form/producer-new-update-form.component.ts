import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { ProducerDTO, ProducerResourceService } from 'aig-commerce';
import { AigValidator } from 'aig-common/AigValidator';

@Component({
    selector: 'aig-producer-new-update-form',
    templateUrl: './producer-new-update-form.component.html',
    styleUrls: ['./producer-new-update-form.component.scss']
})
export class AigProducerNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private producerResourceService: ProducerResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    producer: ProducerDTO;

    producerNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.producerNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', [Validators.required, AigValidator.haveId]],
        })
        
        if (this.producer != null) {
            this.producerNewUpdateForm.patchValue(this.producer);
        }
    }

    async submit() {
        if (!this.producerNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let producer: ProducerDTO = this.producerNewUpdateForm.value;

        try {
            let postOrPut;
            if (producer.id != 0) {
                await this.producerResourceService.updateProducerUsingPUT(producer).toPromise();
                postOrPut = "updated";
            } else {
                await this.producerResourceService.createProducerUsingPOST(producer).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Ipp Producer: '${producer.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newProducer() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
