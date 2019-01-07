import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DeleteSharedModule } from 'app/shared';
import {
    PermMySuffixComponent,
    PermMySuffixDetailComponent,
    PermMySuffixUpdateComponent,
    PermMySuffixDeletePopupComponent,
    PermMySuffixDeleteDialogComponent,
    permRoute,
    permPopupRoute
} from './';

const ENTITY_STATES = [...permRoute, ...permPopupRoute];

@NgModule({
    imports: [DeleteSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PermMySuffixComponent,
        PermMySuffixDetailComponent,
        PermMySuffixUpdateComponent,
        PermMySuffixDeleteDialogComponent,
        PermMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PermMySuffixComponent,
        PermMySuffixUpdateComponent,
        PermMySuffixDeleteDialogComponent,
        PermMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeletePermMySuffixModule {}
