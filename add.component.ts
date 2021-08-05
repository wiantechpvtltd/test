import { Component, OnInit } from '@angular/core';
import { PatientsService } from "../service/patients.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidation } from '../../../custom.validators';
import * as moment from 'moment';
@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  //patientForm: FormGroup;
	submitted = false;
  contryArr: any;
  stateArr: any;
  cityArr: any;
 
  patientForm = new FormGroup({
    patientname:new FormControl("", [Validators.required]),
    phone :new FormControl("", [Validators.required, CustomValidation.cellphoneValidation]),

    middlename:new FormControl(""),
    lastname:new FormControl(""),
    country:new FormControl(""),
    state:new FormControl(""),
    city:new FormControl(""),
    uhid:new FormControl("", [Validators.required]),
    pan:new FormControl("", [Validators.required]),
    age:new FormControl("", [Validators.required]),
    adharno:new FormControl("", [Validators.required]),
    dob: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    email:new FormControl("", [Validators.required, Validators.email]),
    address:new FormControl("", [Validators.required]),
    isActive:new FormControl("", [Validators.required]),
    });


  constructor(private PatientsService: PatientsService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCountry();
  }


  getCountry() {
    this.PatientsService.getCountry().subscribe(res=>{
           this.contryArr = res;
           console.log(res);
    })
  } 

  getState(event){
    console.log(event);
    let countryCode =event.target.value
    var obj = {
         country_id: event.target.value
    }
    console.log(obj);
    this.PatientsService.getState(countryCode).subscribe(res=>{
             this.stateArr = res;
             console.log(res);
    });
}

getCities(event){
  console.log(event);
  let stateCode =event.target.value
  var obj = {
       country_id: event.target.value
  }
  console.log(obj);
  this.PatientsService.getCities(stateCode).subscribe(res=>{
           this.cityArr = res;
           console.log(res);
  });
}



  get f() { 
    return this.patientForm.controls; 
    }

    onChangeInput(data) {
     // console.log('here');
      //console.log(data);
      let age = moment(data, "YYYYMMDD").fromNow();
  //console.log(age);
 // var patientage = age.replace(' days ago','');
  var patientage =age.replace(/\D/g,'');
  
//console.log(patientage);   //prints: 123
this.patientForm.controls.age.setValue(patientage);


      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
      

  addPatient() {
    console.log(this.patientForm);
    this.submitted = true;
    if (this.patientForm.valid) {
      this.PatientsService.addPatient(this.patientForm.value).subscribe(res => {
        this.patientForm.reset();
        this.router.navigate(["/pages/patients"]);
      });
    }
  }
}
