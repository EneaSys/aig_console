import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ContextGroupDTO, ContextGroupResourceService, UserDTO, UserResourceService } from 'api-gest';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, distinctUntilChanged } from 'rxjs/operators';
import { filter } from 'minimatch';
import { AigAutocompleteFilterService } from '../../../_common/services/form/autocomplete-filter.service';
import { AigAutocompleteFunctionService } from '../../../_common/services/form/autocomplete-function.service';
import { AigValidatorService } from '../../../_common/services/form/validator.service';

@Component({
    selector: 'aig-group-associate',
    templateUrl: './group-associate.component.html',
    styleUrls: ['./group-associate.component.scss']
})
export class AigGroupAssociateComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private aigAutocompleteFilterService: AigAutocompleteFilterService,
        public aigAutocompleteFunctionService: AigAutocompleteFunctionService,
        private aigValidatorService: AigValidatorService,
        private contextGroupResourceService: ContextGroupResourceService,
    ) { }

    // Form preparation Objects
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    formGroup: FormGroup;


    // Precompile Objects
    @Input()
    groupParent: ContextGroupDTO;
    @Input()
    groupChild: ContextGroupDTO;
    @Input()
    user: UserDTO;


    // Iteractions Objects
    filteredParentGroups: Observable<ContextGroupDTO[]>;
    filteredChildGroups: Observable<ContextGroupDTO[]>;
    filteredUsers: Observable<UserDTO[]>;












    ngOnInit(): void {
        // PREPARE FORM
        this.formGroup = this._formBuilder.group({
            groupParent: ['', Validators.required],
            groupChild: [''],
            user: [''],
        },{ 
            validator: [
                this.aigValidatorService.getFirstOrSecondValidator('groupChild', 'user'),
            ]
        });


        // PRECOMPILE
        if (this.groupParent != null) {
            this.formGroup.controls['groupParent'].setValue(this.groupParent);
        }
        if (this.groupChild != null) {
            this.formGroup.controls['groupChild'].setValue(this.groupChild);
        }
        if (this.user != null) {
            this.formGroup.controls['user'].setValue(this.user);
        }


        // EVENT ON ITERACTION
        this.filteredParentGroups = this.aigAutocompleteFilterService.filterGroups(this.formGroup.controls['groupParent'].valueChanges);
        this.filteredChildGroups = this.aigAutocompleteFilterService.filterGroups(this.formGroup.controls['groupChild'].valueChanges);
        this.filteredUsers = this.aigAutocompleteFilterService.filterUsers(this.formGroup.controls['user'].valueChanges);
    }













    





    // SUBMIT
    submit() {
        if (!this.formGroup.valid) {
            return;
        }
        this._fuseProgressBarService.show();
        this.setStep("loading");

        let parentName = this.formGroup.controls['groupParent'].value.name;

        if (this.formGroup.controls['groupChild'].value.id != null) {
            let groupChild: ContextGroupDTO = this.formGroup.controls['groupChild'].value;
            groupChild.groupMemberOfs.push(this.formGroup.controls['groupParent'].value);

            this.contextGroupResourceService.updateContextGroupUsingPUT(groupChild).subscribe(
                (value: ContextGroupDTO) => {
                    this._snackBar.open("Group " + value.name + ", added to: " + parentName + ".", null, { duration: 5000, });
                    this._fuseProgressBarService.hide();
                    this.setStep("complete");
                },
                (error: any) => {
                    this._snackBar.open("Error: " + error.error.detail, null, { duration: 10000, });
                    this._fuseProgressBarService.hide();
                    this.setStep("form");
                },
            );
        } else {
            this._snackBar.open("Add user to group not implemented.", null, { duration: 5000, });
            this._fuseProgressBarService.hide();
            this.setStep("form");
        }
    }


    private setStep(step: string) {
        this.step.form = false;
        this.step.loading = false;
        this.step.complete = false;

        this.step[step] = true;
    }
}
