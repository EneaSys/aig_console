import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { EopooService } from 'aig-common/old-common/services/eopoo.service';

@Component({
    templateUrl: './eopoo-detail.component.html',
    styleUrls: ['./eopoo-detail.component.scss']
})
export class EopooDetailComponent implements OnInit {
    id: number;
    eopoo: any = {};

    constructor(
        private route: ActivatedRoute,
        //private router: Router,
        private eopooService: EopooService,
        //private personService: PersonService,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.eopooService.find(this.id).subscribe(
                (res: HttpResponse<any>) => {
                    this.eopoo = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        });

        
    }

    protected onError(errorMessage: string) {
        console.log("Errore: ", errorMessage);
    }

    private ready() {
        if(this.eopoo.id > 0){
            return true;
        } else {
            return false;
        }
    }

}
