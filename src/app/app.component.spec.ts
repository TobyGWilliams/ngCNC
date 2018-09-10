import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

class MockSocket {
  constructor() {}
  fromEvent(m) {
    return of('hello world');
  }
}

xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [],
      providers: [{ provide: Socket, useClass: MockSocket }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    app.ngOnInit();
  }));
});
