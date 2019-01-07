import { NgModule } from '@angular/core';

import { DeleteSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DeleteSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [DeleteSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DeleteSharedCommonModule {}
