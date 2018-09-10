import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  public com: string;
  public baud: string;
  public controller: string;
  public formControl: FormGroup;
  constructor(public socket: Socket, public snackBar: MatSnackBar) {}
  ngOnInit() {
    this.formControl = new FormGroup({
      controller: new FormControl('', [Validators.required]),
      com: new FormControl('', [Validators.required]),
      baud: new FormControl('', [Validators.required])
    });
  }
  connectToController() {
    if (this.formControl.valid) {
      this.socket.emit('connection:connect', {
        baud: this.baud,
        com: this.com,
        controller: this.controller
      });
    } else {
      this.snackBar.open('Please complete all selections', 'close', {
        duration: 2000
      });
    }
  }
}
