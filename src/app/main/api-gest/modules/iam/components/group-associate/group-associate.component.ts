import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { ContextGroupDTO, ContextGroupResourceService, UserDTO, UserResourceService } from 'api-gest';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, distinctUntilChanged } from 'rxjs/operators';
import { filter } from 'minimatch';

@Component({
    selector: 'aig-group-associate',
    templateUrl: './group-associate.component.html',
    styleUrls: ['./group-associate.component.scss']
})
export class AigGroupAssociateComponent implements OnInit {
    @Input()
    groupParent: any;
    @Input()
    groupChild: any;
    @Input()
    user: any;

    constructor(
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private _fuseProgressBarService: FuseProgressBarService,
        private contextGroupResourceService: ContextGroupResourceService,
        private userResourceService: UserResourceService,
    ) { }

    // Form preparation Objects
    step: any = {
        form: true,
        loading: false,
        complete: false
    };
    formGroup: FormGroup;


    // Precompile Objects


    // Iteractions Objects
    filteredParentGroups: Observable<any[]>;
    filteredChildGroups: Observable<any[]>;
    filteredUsers: Observable<any[]>;


    // Return Objects
    //createdElement: TYPE;

    ngOnInit(): void {
        // PREPARE FORM
        this.formGroup = this._formBuilder.group({
            groupParent: ['', Validators.required],
            groupChild: [''],
            user: [''],
        }, { validator: this.groupChildOrUserValidator });


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
        this.filteredParentGroups = this.filterGroups(this.formGroup.controls['groupParent'].valueChanges);
        this.filteredChildGroups = this.filterGroups(this.formGroup.controls['groupChild'].valueChanges);
        this.filteredUsers = this.filterUsers(this.formGroup.controls['user'].valueChanges);
    }

    // FORM VALIDATORS
    private groupChildOrUserValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
        const groupChild = formGroup.controls['groupChild'];
        const user = formGroup.controls['user'];
        if (groupChild.value == "" && user.value == "") {
            groupChild.setErrors({ notEquivalent: true });
            user.setErrors({ notEquivalent: true });
        }
        if (groupChild.value != "" && user.value != "") {
            groupChild.setErrors({ notEquivalent: true });
            user.setErrors({ notEquivalent: true });
        }
        else {
            groupChild.setErrors(null);
            user.setErrors(null);
        }
        return;
    };

    // FILTER OF ITERACTIONS
    private filterGroups(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 4) {
                    return this.contextGroupResourceService.getAllContextGroupsUsingGET({}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, value, null, null, null, null, 10, null, null, null, null, null, null, null, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    private filterUsers(observable: Observable<any>) {
        return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value.length > 5) {
                    return this.userResourceService.getAllUsersUsingGET({}, null, null, null, null, null, null, null, null, 10, null, null, null, null, null, null, null, value, null, null, null, null, null, null, null, null, null, null);
                } else {
                    return of([]);
                }
            })
        );
    }

    groupDisplayFn(contextGroup?: ContextGroupDTO): string | undefined {
        return contextGroup ? contextGroup.name : undefined;
    }

    userDisplayFn(user?: UserDTO): string | undefined {
        return user ? user.email : undefined;
    }


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
