/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DeleteTestModule } from '../../../test.module';
import { PermMySuffixUpdateComponent } from 'app/entities/perm-my-suffix/perm-my-suffix-update.component';
import { PermMySuffixService } from 'app/entities/perm-my-suffix/perm-my-suffix.service';
import { PermMySuffix } from 'app/shared/model/perm-my-suffix.model';

describe('Component Tests', () => {
    describe('PermMySuffix Management Update Component', () => {
        let comp: PermMySuffixUpdateComponent;
        let fixture: ComponentFixture<PermMySuffixUpdateComponent>;
        let service: PermMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DeleteTestModule],
                declarations: [PermMySuffixUpdateComponent]
            })
                .overrideTemplate(PermMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PermMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PermMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PermMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perm = entity;
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
                    const entity = new PermMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perm = entity;
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
