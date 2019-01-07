/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DeleteTestModule } from '../../../test.module';
import { RoleMySuffixDeleteDialogComponent } from 'app/entities/role-my-suffix/role-my-suffix-delete-dialog.component';
import { RoleMySuffixService } from 'app/entities/role-my-suffix/role-my-suffix.service';

describe('Component Tests', () => {
    describe('RoleMySuffix Management Delete Component', () => {
        let comp: RoleMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<RoleMySuffixDeleteDialogComponent>;
        let service: RoleMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [RoleMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(RoleMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RoleMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
