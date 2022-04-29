import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ViewForeignProfilePage } from './view-foreign-profile.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PersistenceService } from 'src/app/services/persistence.service';
import { PersistenceServiceStub } from 'src/app/services/persistence.service.mock';
import { LoginPage } from 'src/app/auth/login/login.page';

describe('ViewForeignProfilePage', () => {
  let component: ViewForeignProfilePage;
  let fixture: ComponentFixture<ViewForeignProfilePage>;
  let de: DebugElement;
  LoginPage.user = {
    userId: 0,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewForeignProfilePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: PersistenceService, useClass: PersistenceServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewForeignProfilePage);
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
      userId: 1000,
      firstName: 'Max',
      lastName: 'Mustermann',
      dhbw: 'Karlsruhe',
      course: 'Informatik',
      courseAbr: 'TINF20B2',
      specialization: 'Angewandte Informatik',
      email: 'mustermann.max@student.dhbw-karlsruhe.de',
      city: 'Ettlingen',
      biography: 'Hello World!!',
      isVerified: true,
      tmsCreated: '2022-04-24T21:37:07.183',
    };
    fixture.detectChanges();
    expect(de.query(By.css('#name')).nativeElement.innerText).toBe(
      'Max Mustermann'
    );
  });
  it('should have remove from contact button if user is in contacts', () => {
    component.isDataAvailable = true;

    component.user = {
      userId: 1000,
      firstName: 'Max',
      lastName: 'Mustermann',
      dhbw: 'Karlsruhe',
      course: 'Informatik',
      courseAbr: 'TINF20B2',
      specialization: 'Angewandte Informatik',
      email: 'mustermann.max@student.dhbw-karlsruhe.de',
      city: 'Ettlingen',
      biography: 'Hello World!!',
      isVerified: true,
      tmsCreated: '2022-04-24T21:37:07.183',
    };
    component.ionViewWillEnter();
    fixture.detectChanges();
    expect(de.query(By.css('#remove_btn')).nativeElement.innerText).toBe(
      'AUS KONTAKTEN ENTFERNEN'
    );
  });
});
