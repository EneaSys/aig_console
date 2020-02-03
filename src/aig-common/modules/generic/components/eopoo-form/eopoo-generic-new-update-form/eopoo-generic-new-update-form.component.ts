import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'aig-eopoo-generic-new-update-form',
    templateUrl: './eopoo-generic-new-update-form.component.html',
    styleUrls: ['./eopoo-generic-new-update-form.component.scss']
})
export class AigEopooGenericNewUpdateFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
    ) { }

    eopooOrganizationNewUpdateForm: FormGroup;

    ngOnInit(): void {
        this.eopooOrganizationNewUpdateForm = this._formBuilder.group({
            taxId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            name: ['', Validators.required]
        });
    }

    submit() {
        if (!this.eopooOrganizationNewUpdateForm.valid) {
            return;
        }

        console.log("createOrganization");

        
    }
}
