import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EopooTypeResourceService, EopooTypeDTO } from 'aig-generic';

@Component({
    selector: 'aig-eopoo-new-form',
    templateUrl: './eopoo-new-form.component.html',
    styleUrls: ['./eopoo-new-form.component.scss']
})
export class AigEopooNewFormComponent implements OnInit {
    person: FormGroup;
    organization: FormGroup;

    eopooTypes: EopooTypeDTO[];

    citys: any[];

    filteredCitysOptions: Observable<any[]>;

    private _eopooType: any;
    private _isCreatePerson: boolean;

    constructor(
        private eopooTypeResourceService: EopooTypeResourceService,
        private route: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private router: Router,
    ) { }

    async ngOnInit() {
        this.eopooTypes = await this.eopooTypeResourceService.getAllEopooTypesUsingGET().toPromise();
        
        this.person = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            taxId: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(17)]],
            sex: ['', Validators.required],
            bornDate: ['', Validators.required],
            bornCity: ['', this.cityValidation]
        });

        this.organization = this._formBuilder.group({
            taxId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            name: ['', Validators.required]
        });

/*
        this.filteredCitysOptions = this.person.controls['bornCity'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
            */
    }

    cityValidation(c: FormControl) {
        if (c.value.id == null) {
            return {
                cityValidation: {
                    valid: false
                }
            };
        }
    }

    private displayFn(city?: any): string | undefined {
        return city ? city.name : undefined;
    }

    private _filter(value: any): any[] {
        if (typeof value === "string") {
            if (value.length > 3) {
                const filterValue = value.toLowerCase();
                return this.citys.filter(option => option.name.toLowerCase().includes(filterValue));
            }
        }
    }

    onEopooTypeChange(eopooType: any) {
        if (eopooType.eopooCategory == "PERSON") {
            this._isCreatePerson = true;
        } else {
            this._isCreatePerson = false;
        }
        this._eopooType = eopooType;
    }
    isCreatePerson() {
        if (this._isCreatePerson === true) {
            return true;
        } else {
            return false;
        }
    }
    isCreateOrganization() {
        if (this._isCreatePerson === false) {
            return true;
        } else {
            return false;
        }
    }

    createPerson() {
        if (!this.person.valid) {
            return;
        }
        console.log("createPerson");
/*
        var eopooCreationRequest: EopooCreationRequest = {
            eopooTypeId: this._eopooType.id,
            taxNumber: this.person.value.taxId,
            person: {
                firstname: this.person.value.firstName,
                lastname: this.person.value.lastName,
                sex: this.person.value.sex,
                bornCityId: this.person.value.bornCity.id,
                bornDate: this.person.value.bornDate,
            }
        };

        this.service.addEopoo(eopooCreationRequest, 'body').subscribe(
            (eopoo) => {
                console.log("Eopoo creata: ", eopoo);
                this.detailEopoo(eopoo.id+"")
            }
        );
        */
    }

    createOrganization() {
        if (!this.organization.valid) {
            return;
        }

        console.log("createOrganization");
/*
        var eopooCreationRequest: EopooCreationRequest = {
            eopooTypeId: this._eopooType.id,
            taxNumber: this.organization.value.taxId,
            generic: {
                name: this.organization.value.name
            },
        };

        this.service.addEopoo(eopooCreationRequest, 'body').subscribe(
            (eopoo) => {
                console.log("Eopoo creata: ", eopoo);
                this.detailEopoo(eopoo.id+"")
            }
        );
        */
    }

    
}
