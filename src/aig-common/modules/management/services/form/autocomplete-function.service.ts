import { Injectable } from '@angular/core';
import { RoleDTO, PermissionDTO } from 'api-gest';

@Injectable()
export class AigManagementAutocompleteFunctionService {
    
    roleDisplayFn(role?: RoleDTO): string | undefined {
        return role ? role.name : undefined;
    }

    permissionDisplayFn(permission?: PermissionDTO): string | undefined {
        return permission ? permission.name : undefined;
    }
}