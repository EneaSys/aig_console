import { Component, OnInit } from '@angular/core';
import { GenericComponent } from 'app/main/api-gest-console/generic-component/generic-component';
import { FoodProductRequestResourceService, FoodProductRequestDTO, FamilyUnitResourceService } from 'aig-solidarety';
import { AigGenericComponentService } from 'app/main/api-gest-console/generic-component/generic-component.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'auth/auth.service';

@Component({
    templateUrl: './solidarity-request-detail-page.component.html',
    styleUrls: ['./solidarity-request-detail-page.component.scss']
})
export class AigSolidarityRequestDetailPageComponent extends GenericComponent {
    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private foodProductRequestResourceService: FoodProductRequestResourceService,
        private familyUnitResourceService: FamilyUnitResourceService,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

    foodProductRequestDTO: any; //FoodProductRequestDTO
    instructor: string[];
    user: any;

    async loadComponent() {
        this.foodProductRequestDTO = this.route.snapshot.data.helpRequest;
        this.user = await this.authService.getUser();

        this.instructor = this.foodProductRequestDTO.familyUnit.note.split('|');
    }


    async take(foodProductRequestDTO: any) {
        // assegna la pratica all'assistente sociale
        foodProductRequestDTO.familyUnit.note = this.user.sub + "|" + this.user.lastName + " " + this.user.firstName;
        this.foodProductRequestDTO.familyUnit = await this.familyUnitResourceService.updateFamilyUnitUsingPUT(foodProductRequestDTO.familyUnit).toPromise();

        // setta lo stato della domanda a 1
        foodProductRequestDTO.note = "1";
        this.foodProductRequestDTO = await this.foodProductRequestResourceService.updateFoodProductRequestUsingPUT(foodProductRequestDTO).toPromise();
    }

    async aprove(foodProductRequestDTO: FoodProductRequestDTO) {
        // setta lo stato della domanda a 2
        foodProductRequestDTO.note = "2";
        this.foodProductRequestDTO = await this.foodProductRequestResourceService.updateFoodProductRequestUsingPUT(foodProductRequestDTO).toPromise();
    }

    async reject(foodProductRequestDTO: FoodProductRequestDTO) {
        // setta lo stato della domanda a 99
        foodProductRequestDTO.note = "99";
        this.foodProductRequestDTO = await this.foodProductRequestResourceService.updateFoodProductRequestUsingPUT(foodProductRequestDTO).toPromise();
    }

    async revalutate(foodProductRequestDTO: any) {
        // setta lo stato della domanda a 0
        foodProductRequestDTO.note = "0";
        this.foodProductRequestDTO = await this.foodProductRequestResourceService.updateFoodProductRequestUsingPUT(foodProductRequestDTO).toPromise();
    }

    checkAssignation(foodProductRequestDTO: any) {
        if(this.user != null && foodProductRequestDTO.familyUnit.note.startsWith(this.user.sub)){
            return true;
        }
        return false;
    }

}
