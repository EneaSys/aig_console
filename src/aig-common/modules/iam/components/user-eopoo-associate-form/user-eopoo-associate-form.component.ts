import { Component, OnInit, Input } from '@angular/core';
import { UserDTO, ContextUserEopooResourceService, ContextUserEopooDTO } from 'api-gest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { EventService } from 'aig-common/event-manager/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EopooDTO } from 'aig-generic';
import { Observable } from 'rxjs';
import { AigAutocompleteFilterService } from '../../services/form/autocomplete-filter.service';
import { AigAutocompleteFunctionService } from '../../services/form/autocomplete-function.service';
import { AigGenericAutocompleteFilterService } from 'aig-common/modules/generic/services/form/autocomplete-filter.service';
import { AigGenericAutocompleteDisplayService } from 'aig-common/modules/generic/services/form/autocomplete-function.service';

@Component({
    selector: 'aig-user-eopoo-associate-form',
    templateUrl: './user-eopoo-associate-form.component.html',
    styleUrls: ['./user-eopoo-associate-form.component.scss']
})
export class AigUserEopooAssociateFormComponent implements OnInit {
    @Input()
    user: UserDTO;
    @Input()
    eopoo: EopooDTO;
    
    step: any = {
        form: true,
        loading: false,
        complete: false
    };

    constructor(
        private aigAutocompleteFilterService: AigAutocompleteFilterService,
        public aigAutocompleteFunctionService: AigAutocompleteFunctionService,
        private aigGenericAutocompleteFilterService: AigGenericAutocompleteFilterService,
        public AigGenericAutocompleteDisplayService: AigGenericAutocompleteDisplayService,
        private contextUserEopooResourceService: ContextUserEopooResourceService,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private eventService: EventService,
    ) { }

    formGroup: FormGroup;


    
    filteredUsers: Observable<UserDTO[]>;
    filteredEopoos: Observable<EopooDTO[]>;



    ngOnInit(): void {
        this.formGroup = this._formBuilder.group({
            user: ['', Validators.required],
            eopoo: ['', Validators.required]
        });

        if(this.user != null) {
            this.formGroup.controls['user'].setValue(this.user);
        }
        if(this.eopoo != null) {
            this.formGroup.controls['eopoo'].setValue(this.eopoo);
        }


        this.filteredUsers = this.aigAutocompleteFilterService.filterUsers(this.formGroup.controls['user'].valueChanges);
        this.filteredEopoos = this.aigGenericAutocompleteFilterService.filterEopoo(this.formGroup.controls['eopoo'].valueChanges);
    }









    async submit() {
        if (!this.formGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let contextUserEopooDTO: any = {
            eopooCode: this.formGroup.value.eopoo.id,
            contextUserId: this.formGroup.value.user.id,
        }

        try {
            await this.contextUserEopooResourceService.createContextUserEopooUsingPOST(contextUserEopooDTO).toPromise();
            this.eventService.reloadCurrentPage();
            this._snackBar.open("Eopoo associated", null, { duration: 5000, });
            this.setStep("complete");
        } catch(e) {
            this._snackBar.open("Error: " + e.error.message, null, { duration: 10000, });
            this.setStep("form");
        }
        
        this._fuseProgressBarService.hide();
    }

    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
