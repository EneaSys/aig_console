import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'aig-eopoo-person-new-update-form',
    templateUrl: './eopoo-person-new-update-form.component.html',
    styleUrls: ['./eopoo-person-new-update-form.component.scss']
})
export class AigEopooPersonNewUpdateFormComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
    ) { }

    eopooPersonNewUpdateForm: FormGroup;
    
    ngOnInit(): void {
        this.eopooPersonNewUpdateForm = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(17)]],
            sex: ['', Validators.required],
            bornDate: ['', Validators.required],
            bornCity: ['', Validators.required],
        });
    }

    submit() {
        if (!this.eopooPersonNewUpdateForm.valid) {
            return;
        }

        console.log("create Person");

        
    }
}
