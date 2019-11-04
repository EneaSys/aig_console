import { Pipe, PipeTransform } from '@angular/core';
import { RoleAssignationDTO, UserDTO } from 'api-gest';

@Pipe({name: 'roleAssignationsToUsers'})
export class AigRoleAssignationsToUsersPipe implements PipeTransform {
    transform(roleAssignationDTOs: any[]): UserDTO[] { //RoleAssignationDTO e non any
        let userDTOs: UserDTO[] = [];
        if(roleAssignationDTOs == null) {
            return userDTOs;
        }
        roleAssignationDTOs.forEach(roleAssignationDTO => {
            let userDTO: UserDTO = new AigRoleAssignationToUserPipe().transform(roleAssignationDTO);
            userDTOs.push(userDTO);
        });
        return userDTOs;
    }
}

@Pipe({name: 'roleAssignationToUser'})
export class AigRoleAssignationToUserPipe implements PipeTransform {
    transform(roleAssignationDTO: any): UserDTO { //RoleAssignationDTO e non any
        if(roleAssignationDTO == null) {
            return null;
        }
        let userDTO: UserDTO = {
            userCode: roleAssignationDTO.user.userCode,
            email: roleAssignationDTO.user.email,
            firstName: roleAssignationDTO.user.firstName,
            lastName: roleAssignationDTO.user.lastName,
            status: roleAssignationDTO.user.status,
            type: roleAssignationDTO.user.type,
        };
        return userDTO;
    }
}