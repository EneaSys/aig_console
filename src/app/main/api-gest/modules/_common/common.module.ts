import { NgModule } from '@angular/core';
import { EopooNamePipe } from './pipe/eopoo-name.pipe';
import { CityResolver } from './services/city.resolver';
import { EopooService } from './services/eopoo.service';
import { EopooTypeService } from './services/eopoo-type.service';
import { EopooTypeResolver } from './services/eopoo-type.resolver';
import { PersonService } from './services/person.service';
import { CityService } from './services/city.service';
import { ApiModule } from './services/test';
import { ApolloDocumentService } from './services/apollo-document.service';
import { ApolloDocumentResolver } from './services/apollo-document.resolver';
import { ApolloDocumentLineService } from './services/apollo-document-line.service';
import { ApolloDocumentLineResolver } from './services/apollo-document-line.resolver';
import { AigUserService } from './services/context-user.service';
import { AigGroupService } from './services/group.service';
import { AigRoleAssignationService } from './services/role-assignation.service';
import { RoleSystemResolver } from './resolver/role-system.resolver';
import { RoleCustomResolver } from './resolver/role-custom.resolver';
import { PermissionsRoleCustomResolver } from './resolver/permission-role-custom.resolver';
import { UserResolver } from './resolver/user.resolver';
import { GroupResolver } from './resolver/group.resolver';
import { AigRoleAssignationToGroupPipe, AigRoleAssignationsToGroupsPipe } from './pipe/role-assignation-to-group.pipe';
import { AigRoleAssignationsToUsersPipe, AigRoleAssignationToUserPipe } from './pipe/role-assignation-to-user.pipe';

@NgModule({
    declarations: [
        EopooNamePipe,
        AigRoleAssignationsToGroupsPipe,
        AigRoleAssignationToGroupPipe,
        AigRoleAssignationsToUsersPipe,
        AigRoleAssignationToUserPipe,
    ],
    imports: [
        ApiModule
    ],
    exports: [
        EopooNamePipe,
        AigRoleAssignationsToGroupsPipe,
        AigRoleAssignationToGroupPipe,
        AigRoleAssignationsToUsersPipe,
        AigRoleAssignationToUserPipe,
    ],
    providers: [
        EopooService,

        EopooTypeService,
        EopooTypeResolver,

        PersonService,
        
        CityService,
        CityResolver,
        
        ApolloDocumentService,
        ApolloDocumentResolver,
        
        ApolloDocumentLineService,
        ApolloDocumentLineResolver,

        AigUserService,
        AigGroupService,
        AigRoleAssignationService,


        RoleSystemResolver,
        RoleCustomResolver,
        PermissionsRoleCustomResolver,
        UserResolver,
        GroupResolver,
    ],
})
export class AigCommonModule {}