import { Pipe, PipeTransform } from '@angular/core';
import { RoleAssignationDTO, ContextGroupDTO } from 'api-gest';

@Pipe({name: 'roleAssignationsToGroups'})
export class AigRoleAssignationsToGroupsPipe implements PipeTransform {
    transform(roleAssignationDTOs: any[]): ContextGroupDTO[] { //RoleAssignationDTO e non any
        let contextGroupDTOs: ContextGroupDTO[] = [];
        if(roleAssignationDTOs == null) {
            return contextGroupDTOs;
        }
        roleAssignationDTOs.forEach(roleAssignationDTO => {
            let contextGroupDTO: ContextGroupDTO = new AigRoleAssignationToGroupPipe().transform(roleAssignationDTO);
            contextGroupDTOs.push(contextGroupDTO);
        });
        return contextGroupDTOs;
    }
}

@Pipe({name: 'roleAssignationToGroup'})
export class AigRoleAssignationToGroupPipe implements PipeTransform {
    transform(roleAssignationDTO: any): ContextGroupDTO { //RoleAssignationDTO e non any
        if(roleAssignationDTO == null) {
            return null;
        }
        let contextGroupDTO: ContextGroupDTO = {
            id: roleAssignationDTO.groupId,
            name: roleAssignationDTO.group.name,
            groupMemberOfs: roleAssignationDTO.group.groupMemberOfs
        };
        return contextGroupDTO;
    }
}