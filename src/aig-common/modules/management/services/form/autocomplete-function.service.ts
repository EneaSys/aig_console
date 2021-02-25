import { Injectable } from '@angular/core';
import { RoleDTO, PermissionDTO, ApplicationModuleDTO, TenantContextDTO,} from 'aig-management';


@Injectable({
        providedIn: 'root'
})
export class AigManagementAutocompleteFunctionService {
    
    roleDisplayFn(role?: RoleDTO): string | undefined {
        return role ? role.name : undefined;
    }

    permissionDisplayFn(permission?: PermissionDTO): string | undefined {
        return permission ? permission.name : undefined;
    }

    applicationModuleDisplayFn(applicationModule?: ApplicationModuleDTO): string | undefined {
        return applicationModule ? applicationModule.name : undefined;
    }

    tenantContextDisplayFn(tenantContext?: TenantContextDTO): string | undefined {
       return tenantContext ? tenantContext.name : undefined;
    }

}