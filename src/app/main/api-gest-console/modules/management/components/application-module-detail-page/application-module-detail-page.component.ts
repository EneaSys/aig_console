import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { ApplicationModuleDTO, ApplicationModuleResourceService, ContextModuleResourceService, ContextUserResourceService, EntityReferenceDTO, EntityReferenceResourceService, PermissionResourceService, PersonalizationDTO, PersonalizationResourceService, RoleResourceService } from "aig-management";
import { ContextModuleDTO } from "aig-management";
import { PermissionDTO } from "aig-management";
import { ContextUserDTO } from "aig-management";
import { RoleDTO } from "aig-management";

import { GenericComponent } from "app/main/api-gest-console/generic-component/generic-component";
import { AigGenericComponentService } from "app/main/api-gest-console/generic-component/generic-component.service";
import { AigApplicationModuleNewUpdateModalComponent } from "../application-module-new-update-modal/application-module-new-update-modal.component";
import { AigContextModuleNewUpdateModalComponent } from "../context-module-new-update-modal/context-module-new-update-modal.component";
import { AigContextUserNewUpdateModalComponent } from "../context-user-new-update-modal/context-user-new-update-modal.component";
import { AigEntityReferenceNewUpdateModalComponent } from "../entity-reference-new-update-modal/entity-reference-new-update-modal.component";
import { AigPermissionNewUpdateModalComponent } from "../permission-new-update-modal/permission-new-update-modal.component";
import { AigRoleNewUpdateModalComponent } from "../role-new-update-modal/role-new-update-modal.component";

@Component({
	selector: 'aig-application-module-detail-page',
	templateUrl: './application-module-detail-page.component.html',
	styleUrls: ['./application-module-detail-page.component.scss']
})
export class AigApplicationModuleDetailPageComponent extends GenericComponent {
    constructor(
        private applicationModuleResourceService: ApplicationModuleResourceService,
        private contextUserResourceService: ContextUserResourceService,
        private roleResourceService: RoleResourceService,
        private contextModuleResourceService: ContextModuleResourceService,
        private permissionResourceService: PermissionResourceService,
        private personalizationResourceService: PersonalizationResourceService,
        private entityReferenceResourceService: EntityReferenceResourceService,
        private route: ActivatedRoute,
		private _snackBar: MatSnackBar,
		private router: Router,
		private _fuseProgressBarService: FuseProgressBarService,
        private dialog: MatDialog,
        aigGenericComponentService: AigGenericComponentService,
    ) { super(aigGenericComponentService) }

	applicationModuleDTO: ApplicationModuleDTO;

    loadPage() {
		this.applicationModuleDTO = this.route.snapshot.data.applicationModule;
        this.loadOther();
	}

	async reloadPage() {
		this.applicationModuleDTO = await this.applicationModuleResourceService.getApplicationModuleUsingGET(this.applicationModuleDTO.id).toPromise();
	}

    async loadOther() {
        this.loadEntityReference();
        this.loadContextModule();
        this.loadPermission();
        this.loadContextUser();
        this.loadRole();
    }

	async deleteApplicationModule(id: number) {
        this._fuseProgressBarService.show();
    
        try {
            await this.applicationModuleResourceService.deleteApplicationModuleUsingDELETE(id).toPromise();
    
            this._snackBar.open(`Application Module: '${id}' deleted.`, null, { duration: 2000, });
            
            this.router.navigate(['/m8t', 'application-module']);
        } catch (e) {
            this._snackBar.open(`Error during deleting Application Module: '${id}'. (${e.message})`, null, { duration: 5000, });
        }
        this._fuseProgressBarService.hide();
    }
	
    editApplicationModule(applicationModuleDTO: ApplicationModuleDTO) {
		this.dialog.open(AigApplicationModuleNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }






	roleDC: string[] = ['id','name','roleCode','permissions','buttons'];
    roleDTOs: RoleDTO[];
    roleError: any;
    
    async loadRole() {
        let filters = {
            applicationModuleIDEquals: this.applicationModuleDTO.id
        };
        
        try {
        this.roleDTOs = await this.roleResourceService.getAllRolesUsingGET(filters).toPromise();
        
        } catch (e) {
        this.roleError = e;
        }
    }

    newRole(applicationModuleDTO: ApplicationModuleDTO): void {
        this.dialog.open(AigRoleNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }


	
	

    permissionDC: string[] = ['id','name','permissionCode','buttons'];
    permissionDTOs: PermissionDTO[];
    permissionError: any;
    
    async loadPermission() {
       
        let filters = {
            applicationModuleIDEquals: this.applicationModuleDTO.id
        };
        
        try {
        this.permissionDTOs = await this.permissionResourceService.getAllPermissionsUsingGET(filters).toPromise();
        
        } catch (e) {
        this.permissionError = e;
        }
    }

    newPermission(applicationModuleDTO: ApplicationModuleDTO): void {
        this.dialog.open(AigPermissionNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }










    entityReferenceDC: string[] = ['id', 'name', 'buttons'];
    entityReferenceDTOs: EntityReferenceDTO[];
    entityReferenceError: any;
    
    async loadEntityReference() {
        
        let filters = {
            applicationModuleIDEquals: this.applicationModuleDTO.id
        };
        
        try {
        this.entityReferenceDTOs = await this.entityReferenceResourceService.getAllEntityReferencesUsingGET(filters).toPromise();
        
        } catch (e) {
        this.entityReferenceError = e;
        }
    }

    newEntityReference(applicationModuleDTO: ApplicationModuleDTO): void {
        this.dialog.open(AigEntityReferenceNewUpdateModalComponent , { data: { applicationModule: applicationModuleDTO } });
    }











    contextModuleDC: string[] = ['id','tenantContext','active','buttons'];
    contextModuleDTOs: ContextModuleDTO[];
    contextModuleError: any;
    
    async loadContextModule() {
       
        let filters = {
            applicationModuleIDEquals: this.applicationModuleDTO.id
        };
        
        try {
        this.contextModuleDTOs = await this.contextModuleResourceService.getAllContextModulesUsingGET(filters).toPromise();
        
        } catch (e) {
        this.contextModuleError = e;
        }
    }

    newContextModule(applicationModuleDTO: ApplicationModuleDTO): void {
        this.dialog.open(AigContextModuleNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }
















    contextUserDC: string[] = ['id', 'userCode','buttons'];
    contextUserDTOs: ContextUserDTO[];
    contextUserError: any;
    
    async loadContextUser() {
        let filters = {
            applicationModuleIDEquals: this.applicationModuleDTO.id
        };
        
        try {
        this.contextUserDTOs = await this.contextUserResourceService.getAllContextUsersUsingGET(filters).toPromise();
        
        } catch (e) {
        this.contextUserError = e;
        }
    }

    newContextUser(applicationModuleDTO: ApplicationModuleDTO): void {
        this.dialog.open(AigContextUserNewUpdateModalComponent, { data: { applicationModule: applicationModuleDTO } });
    }






    
}