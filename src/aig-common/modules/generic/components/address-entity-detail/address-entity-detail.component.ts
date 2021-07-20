import { Component, Input, OnInit } from '@angular/core';
import { AddressDTO } from 'aig-generic';

@Component({
    selector: 'aig-address-entity-detail',
    templateUrl: './address-entity-detail.component.html',
    styleUrls: ['./address-entity-detail.component.scss']
})
export class AigAddressEntityDetailComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {}

    @Input()
    address: AddressDTO;
}