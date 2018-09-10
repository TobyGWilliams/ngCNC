import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatCardModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectionComponent } from './connection.component';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

class MockSocket {
  constructor() {}
  emit(s, m) {
    console.log(s, m);
  }
  fromEvent(m) {
    if (m === 'config:BaudRate') {
      return of([
        110,
        300,
        600,
        1200,
        2400,
        4800,
        9600,
        14400,
        19200,
        38400,
        57600,
        115200,
        128000,
        256000
      ]);
    }
    if (m === 'config:Controller') {
      return of(['Smoothie', 'GRBL', 'TinyG']);
    }
    if (m === 'config:COMPorts') {
      return of(['COM1', 'COM2', 'COM3']);
    }
    return of('hello world');
  }
}

fdescribe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionComponent],
      providers: [{ provide: Socket, useClass: MockSocket }],
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.autoDetectChanges(true);
  });

  it('fill out the form and submit', fakeAsync(() => {
    const emit = spyOn(component.socket, 'emit').and.callThrough();
    selectHelper(fixture, '#selectController .mat-select-trigger', 'Smoothie');
    selectHelper(fixture, '#selectCom .mat-select-trigger', 'COM2');
    selectHelper(fixture, '#selectBaud .mat-select-trigger', '115200');
    fixture.debugElement.query(By.css('#buttonConnect')).nativeElement.click();
    tick(1000);
    expect(component.baud).toBe(115200);
    expect(component.com).toBe('COM2');
    expect(component.controller).toBe('Smoothie');
    expect(emit).toHaveBeenCalled();
  }));

  it('fill out the some of the form and not be submitted', fakeAsync(() => {
    const emit = spyOn(component.socket, 'emit').and.callThrough();
    selectHelper(fixture, '#selectController .mat-select-trigger', 'Smoothie');
    selectHelper(fixture, '#selectCom .mat-select-trigger', 'COM2');
    fixture.debugElement.query(By.css('#buttonConnect')).nativeElement.click();
    tick(1000);
    expect(emit).toHaveBeenCalledTimes(0);
  }));
});

function selectHelper(
  fixture: ComponentFixture<ConnectionComponent>,
  selector: string,
  key: string
) {
  let trigger;
  let option;

  trigger = fixture.debugElement.query(By.css(selector)).nativeElement;
  trigger.click();
  fixture.detectChanges();

  option = fixture.debugElement.query(
    By.css(`mat-option[ng-reflect-value="${key}"]`)
  );
  option.nativeElement.click();
  fixture.detectChanges();
  tick(1000);
}
