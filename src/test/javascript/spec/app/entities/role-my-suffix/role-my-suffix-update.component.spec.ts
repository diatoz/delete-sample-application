/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DeleteTestModule } from '../../../test.module';
import { RoleMySuffixUpdateComponent } from 'app/entities/role-my-suffix/role-my-suffix-update.component';
import { RoleMySuffixService } from 'app/entities/role-my-suffix/role-my-suffix.service';
import { RoleMySuffix } from 'app/shared/model/role-my-suffix.model';

describe('Component Tests', () => {
    describe('RoleMySuffix Management Update Component', () => {
        let comp: RoleMySuffixUpdateComponent;
        let fixture: ComponentFixture<RoleMySuffixUpdateComponent>;
        let service: RoleMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [RoleMySuffixUpdateComponent]
            })
                .overrideTemplate(RoleMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoleMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RoleMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.role = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RoleMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.role = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
