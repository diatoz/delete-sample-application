import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeleteSharedModule } from 'app/shared';
import {
    RoleMySuffixComponent,
    RoleMySuffixDetailComponent,
    RoleMySuffixUpdateComponent,
    RoleMySuffixDeletePopupComponent,
    RoleMySuffixDeleteDialogComponent,
    roleRoute,
    rolePopupRoute
} from './';

const ENTITY_STATES = [...roleRoute, ...rolePopupRoute];

@NgModule({
    imports: [DeleteSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RoleMySuffixComponent,
        RoleMySuffixDetailComponent,
        RoleMySuffixUpdateComponent,
        RoleMySuffixDeleteDialogComponent,
        RoleMySuffixDeletePopupComponent
    ],
    entryComponents: [
        RoleMySuffixComponent,
        RoleMySuffixUpdateComponent,
        RoleMySuffixDeleteDialogComponent,
        RoleMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeleteRoleMySuffixModule {}
