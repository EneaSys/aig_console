import { Injectable } from '@angular/core';
import { RoleDTO, PermissionDTO, ApplicationModuleDTO, TenantContextDTO, EntityReferenceDTO, ContextModuleDTO, ContextUserDTO, PersonalizationDTO,} from 'aig-management';


@Injectable({
        providedIn: 'root'
})
export class AigManagementAutocompleteFunctionService {
   
    applicationModuleDisplayFn(applicationModule?: ApplicationModuleDTO): string | undefined {
        return applicationModule ? applicationModule.name : undefined;
    }

    tenantContextDisplayFn(tenantContext?: TenantContextDTO): string | undefined {
       return tenantContext ? tenantContext.name : undefined;
    }

    entityReferenceDisplayFn(entityReference?: EntityReferenceDTO): string | undefined {
        return entityReference ? entityReference.name : undefined;
    }

    contextModuleDisplayFn(contextModule?: ContextModuleDTO): string | undefined {
        return contextModule ? contextModule.contextName : undefined;
    }

    contextUserDisplayFn(contextUser?: ContextUserDTO): string | undefined {
        return contextUser ? contextUser.userCode : undefined;
    }
     
    roleDisplayFn(role?: RoleDTO): string | undefined {
        return role ? role.name : undefined;
    }

    permissionDisplayFn(permission?: PermissionDTO): string | undefined {
        return permission ? permission.name : undefined;
    }

    personalizationDisplayFn(personalization?: PersonalizationDTO): string | undefined {
        return personalization ? personalization.name : undefined;
    }

}