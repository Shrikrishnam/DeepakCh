import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { UserService } from "../_services/user.service";
import { first } from "rxjs/operators";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  id: String;
  private update = false;
  private add = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.makeForm();

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != null) {
      let firstname = this.route.snapshot.paramMap.get("firstname");
      let lastname = this.route.snapshot.paramMap.get("lastname");
      let inr = this.route.snapshot.paramMap.get("inr");
      let paisa = this.route.snapshot.paramMap.get("paisa");
      let streetaddress = this.route.snapshot.paramMap.get("streetaddress");
      let city = this.route.snapshot.paramMap.get("city");
      let s = this.route.snapshot.paramMap.get("state");
      let c = this.route.snapshot.paramMap.get("country");
      let p = this.route.snapshot.paramMap.get("pincode");
      let phonenumber = this.route.snapshot.paramMap.get("phonenumber");
      let email = this.route.snapshot.paramMap.get("email");
      let age = this.route.snapshot.paramMap.get("age");
      let trainerpreference = this.route.snapshot.paramMap.get(
        "trainerpreference"
      );
      let physiotherapist = this.route.snapshot.paramMap.get("physiotherapist");
      let packages = this.route.snapshot.paramMap.get("packages");

      console.log(this.id);
      this.fitnessForm.patchValue({
        firstname: firstname,
        lastname: lastname,
        inr: inr,
        paisa: paisa,
        streetaddress: streetaddress,
        city: city,
        state: s,
        country: c,
        pincode: p,
        phonenumber: phonenumber,
        email: email,
        age: age,
        trainerpreference: trainerpreference,
        physiotherapist: physiotherapist,
        packages: packages,
      });
      this.add = false;
      this.update = true;
    } //if  ends here
  }

  makeForm() {
    this.fitnessForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      age: ["", [Validators.required, Validators.min(18), Validators.max(60)]],
      email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      phonenumber: ["", Validators.required],
      streetaddress: ["", Validators.required],
      city: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      state: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      country: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      pincode: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],

      trainerpreference: ["", Validators.required],
      physiotherapist: ["", Validators.required],
      packages: ["", Validators.required],
      paisa: ["", [Validators.required]],
      inr: ["", Validators.required],
    });
  }
  setAmount(e) {
    this.fitnessForm.get("inr").setValue(e.target.value);
    this.fitnessForm.get("paisa").setValue("50");
  }

  onSubmit() {
    if (this.fitnessForm.valid) {
      var fitness: Fitness = new Fitness(
        this.fitnessForm.value.inr,
        this.fitnessForm.value.paisa,
        this.fitnessForm.value.streetaddress,
        this.fitnessForm.value.city,
        this.fitnessForm.value.state,
        this.fitnessForm.value.country,
        this.fitnessForm.value.pincode,
        this.fitnessForm.value.phonenumber,
        this.fitnessForm.value.email,
        this.fitnessForm.value.firstname,
        this.fitnessForm.value.lastname,
        this.fitnessForm.value.age,
        this.fitnessForm.value.trainerpreference,
        this.fitnessForm.value.physiotherapist,
        this.fitnessForm.value.packages
      );

      if (this.add) {
        this.userService.postfitnessdata(fitness).subscribe((resp) => {
          console.log(resp);
          //alert("Appointment placed");
        });
      } else {
        this.userService
          .updatefitnessdata(this.id, fitness)
          .subscribe((resp) => {
            console.log(resp);
          });
      }

      this.router.navigateByUrl("view-appointment");
    }

    /*console.log(this.fitnessForm.value);
    this.userService
      .postfitnessdata(this.fitnessForm.value)
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl("view-appointment");
  */
  }
}
