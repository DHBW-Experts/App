import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersistenceServiceStub } from '../../services/persistence/persistence.service.mock';
import { PersistenceService } from '../../services/persistence/persistence.service';
import { ForeignProfilePage } from './foreign-profile.page';
import { LoginPage } from '../login/login.page';

xdescribe('ViewForeignProfilePage', () => {
  let component: ForeignProfilePage;
  let fixture: ComponentFixture<ForeignProfilePage>;
  let de: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignProfilePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: PersistenceService, useClass: PersistenceServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForeignProfilePage);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should have contact button', () => {
    expect(de.query(By.css('#Verify_Button')).nativeElement.innerText).toBe(
      'ZU MEINEN KONTAKTEN HINZUFÜGEN'
    );
  });

  it('should have no contact button if foreing user is logged in user', () => {
    component.isUserLoggedInUser = true;
    fixture.detectChanges();
    expect(de.query(By.css('#Verify_Button'))).toBeFalsy();
  });
  it('should display name', () => {
    component.isDataAvailable = true;
    component.user = {
      userId: '626db5fc4105f20069997435',
      firstname: 'Max',
      lastname: 'Mustermann',
      dhbwLocation: 'Karlsruhe',
      course: 'Informatik',
      courseAbbr: 'TINF20B2',
      specialization: 'Angewandte Informatik',
      email: 'mustermann.max@student.dhbw-karlsruhe.de',
      city: 'Ettlingen',
      biography: 'Hello World!!',
      registered: true,
      createdAt: '2022-04-24T21:37:07.183',
    };
    fixture.detectChanges();
    expect(de.query(By.css('#name')).nativeElement.innerText).toBe(
      'Max Mustermann'
    );
  });
  it('should have remove from contact button if user is in contacts', () => {
    component.isDataAvailable = true;

    component.user = {
      userId: '626db5fc4105f20069997435',
      firstname: 'Max',
      lastname: 'Mustermann',
      dhbwLocation: 'Karlsruhe',
      course: 'Informatik',
      courseAbbr: 'TINF20B2',
      specialization: 'Angewandte Informatik',
      email: 'mustermann.max@student.dhbw-karlsruhe.de',
      city: 'Ettlingen',
      biography: 'Hello World!!',
      registered: true,
      createdAt: '2022-04-24T21:37:07.183',
    };
    component.isUserInContacts = true;
    component.ionViewWillEnter();
    fixture.detectChanges();
    expect(de.query(By.css('#remove_btn')).nativeElement.innerText).toBe(
      'AUS KONTAKTEN ENTFERNEN'
    );
  });
});
