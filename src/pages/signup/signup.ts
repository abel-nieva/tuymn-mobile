import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  public signupForm: any;
  private emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.pattern(this.emailRegex)],
      password: ['', Validators.required]
    });
  }

  logForm(){
    console.log(this.signupForm.value)
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
