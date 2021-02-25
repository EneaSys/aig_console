import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';

@Component({
    selector: 'aig-tenant-context-new-update-form',
    templateUrl: './tenant-context-new-update-form.component.html',
    styleUrls: ['./tenant-context-new-update-form.component.scss']
})
export class AigTenantContextNewUpdateFormComponent implements OnInit {
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private tenantContextResourceService: TenantContextResourceService,
        private eventService: EventService,
    ) { }

    @Input()
    tenantContext: TenantContextDTO;

    tenantContextNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.tenantContextNewUpdateForm = this._formBuilder.group({
            id:[''],
            name: ['', Validators.required],
            contextCode:[''],
            nameDatabase:[''],
        })
        
        if (this.tenantContext != null) {
            this.tenantContextNewUpdateForm.patchValue(this.tenantContext);
        }
    }

    async submit() {
        if (!this.tenantContextNewUpdateForm.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let tenantContext: TenantContextDTO = this.tenantContextNewUpdateForm.value;

        try {
            let postOrPut;
            if (tenantContext.id != 0) {
                await this.tenantContextResourceService.updateTenantContextUsingPUT(tenantContext).toPromise();
                postOrPut = "updated";
            } else {
                await this.tenantContextResourceService.createTenantContextUsingPOST(tenantContext).toPromise();
                postOrPut = "created";
            }
            this.eventService.reloadCurrentPage();

            this._snackBar.open(`Tenant Context: '${tenantContext.name}' ${postOrPut}.`, null, { duration: 2000, });
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newTenantContext() {
        this.setStep("form");
    }

    private setStep(step: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
        this.step[step] = true;
    }
}
