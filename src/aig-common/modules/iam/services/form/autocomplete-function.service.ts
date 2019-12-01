import { Injectable } from '@angular/core';
import { ContextGroupDTO, UserDTO, RoleDTO, CustomRoleDTO } from 'api-gest';

@Injectable()
export class AigAutocompleteFunctionService {
    groupDisplayFn(contextGroup?: ContextGroupDTO): string | undefined {
        return contextGroup ? contextGroup.name : undefined;
    }

    userDisplayFn(user?: UserDTO): string | undefined {
        return user ? user.email : undefined;
    }

    roleSystemDisplayFn(role?: RoleDTO): string | undefined {
        return role ? role.name : undefined;
    }

    roleCustomDisplayFn(customRole?: CustomRoleDTO): string | undefined {
        return customRole ? customRole.name : undefined;
    }
}