import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators, FormGroup, FormArray} from '@angular/forms';
import { from } from 'rxjs';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordCheck } from './shared/password-validator';
import { RegstrationService } from './regstration.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  regestration : FormGroup;
  constructor(private fb:FormBuilder,private regstrationservice:RegstrationService){}
  ngOnInit(): void {

    this.regestration=this.fb.group({
      userName:['',[Validators.required,Validators.minLength(3),forbiddenNameValidator]],
      email:[''],
      subscribe:[false],
     password:[''],
     confirmPassword:[''],
     address:this.fb.group({
       city:[''],
       state:[''],
       postalCode:['']
     }),
     alternateEmails:this.fb.array([])
   },{validator:passwordCheck})
   
   this.regestration.get('subscribe').valueChanges
   .subscribe(checkedValue=>{
     const email=this.regestration.get('email');
     if(checkedValue){
       email.setValidators(Validators.required);
     } else{
       email.clearValidators();
     }
     email.updateValueAndValidity();
   })
    
  }
   
  
 /* regestration=new FormGroup({
    userName:new FormControl(),
    password:new FormControl(),
    confirmPassword:new FormControl(),
    address:new FormGroup({
        city:new FormControl(),
        state:new FormControl(),
        postalCode:new FormControl()
    }),
  });*/
getEmail(){
  return this.regestration.get('email');
}
 get alternateEmails(){
   return this.regestration.get('alternateEmails') as FormArray;
 }
addAlternateEmail(){

this.alternateEmails.push(this.fb.control(''));

}
onSubmit(){
  console.log(this.regestration.value);
    this.regstrationservice.register(this.regestration.value).subscribe(
    response=>console.log('success',response),
    error=>console.error('Failure',error));
}

loadAPI(){
     /* this.regestration.setValue({
        userName:'Abhijit',
        email:'a@b.com',
        subscribe:true,
        password:'abhi@123',
        confirmPassword:'abhi@123',
        address:{
          city:'Pune',
          state:'Maharashtra',
          postalCode:'411033'
        }
      })*/

  }
}
