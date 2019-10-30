import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from 'api-gest';

@Component({
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class AigUserDetailComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
    ) { }

    user: UserDTO;

    ngOnInit(): void {
        this.user = this.route.snapshot.data.user;
    }
}
