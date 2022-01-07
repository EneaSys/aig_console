import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { EventService } from "aig-common/event-manager/event.service";
import { ContextUserDTO, ContextUserResourceService } from "aig-entity-manager";

@Component({
    selector: 'aig-user-context-new-update-form',
    templateUrl: './context-user-new-update-form.component.html',
    styleUrls: ['./context-user-new-update-form.component.scss']
})
export class AigContextUserNewUpdateFormComponent implements OnInit {

	@Input()
    contextUser: ContextUserDTO;

    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseProgressBarService: FuseProgressBarService,
        private _snackBar: MatSnackBar,
        private contextUserResourceService: ContextUserResourceService,
        
        private eventService: EventService,
    ) { }

    contextUserNewUpdateForm: FormGroup;

    isUpdate: boolean = false;

    contextUserResult: any;

	types: any[] = [
		{
			value: 'PERSON',
			desc: 'Utente'
		},
		{
			value: 'SERVICE',
			desc: 'Account di servizio'
		},
	];

	status: any[] = [
		{
			value: 'ACTIVE',
			desc: 'Attivo'
		},
		{
			value: 'DISABLED',
			desc: 'Disattivo'
		},
	];

	modules: any[] = [
		{
			value: '15h9p18au8dttfeiv99ia0rgd7',
			desc: 'Generic Module'
		},
		{
			value: 'jmsbukln128pga9k6d29vjcc',
			desc: 'Italian legislation'
		},
		{
			value: '5r8snslsnmi3ev6nqjaf96ngoh',
			desc: 'Commerce'
		},
		{
			value: '75dfhid5l13jcu7m8dtli6cr7n',
			desc: 'Wallet'
		},
	];



    ngOnInit(): void {
        this.contextUserNewUpdateForm = this._formBuilder.group({
            id: [null],
            
            userCode: [null, [Validators.required] ],
			note: [null ],

            status: [null, [Validators.required] ],
			type: [null, [Validators.required] ],

        })
        
        if (this.contextUser != null) {
            this.contextUserNewUpdateForm.patchValue(this.contextUser);
            this.isUpdate = true;
        }
    }

    async submit() {
        if (!this.contextUserNewUpdateForm.valid) {
            return;
        }

        this._fuseProgressBarService.show();
        this.setStep("loading");

        let contextUser: ContextUserDTO = this.contextUserNewUpdateForm.value;
		if(this.isUpdate) {
			contextUser.userMemberOfs = this.contextUser.userMemberOfs;
		}
        

        try {
            let postOrPut: string;

            if (this.isUpdate) {
                await this.contextUserResourceService.updateContextUserUsingPUT(contextUser).toPromise();
                postOrPut = "updated";
            } else {
                await this.contextUserResourceService.createContextUserUsingPOST(contextUser).toPromise();
                postOrPut = "created";
            }

            this.contextUserResult = contextUser;

            this.eventService.reloadCurrentPage();
  
            this.setStep("complete");
        } catch (e) {
            this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
            this.setStep("form");
        }
        this._fuseProgressBarService.hide();
    }

    newContextUser() {
        this.setStep("form");
    }

    private setStep(stepToShow: string){
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;
			
        this.step[stepToShow] = true;
    }
}
