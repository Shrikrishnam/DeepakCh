import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
  styleUrls: ["./view.appointment.component.css"],
})
export class ViewAppointmentComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  appointments: any[];
  ngOnInit() {
    this.getfitness();
  }

  getfitness() {
    this.userService.getfitnessdata().subscribe((data) => {
      //console.log(data);
      this.appointments = data;
    });
  }

  deleteAppoinment(id) {
    let choice = confirm("Are you sure you want to delete");
    if (choice == true) {
      this.userService.deleteAppointment(id).subscribe(
        () => {
          this.ngOnInit();
        },
        (err) => console.log(err)
      );
    } else {
      console.log("no Action");
    }
  }

  updateAppointment(data) {
    //alert(data.firstname);
    this.router.navigate([
      "/place-fitness-trainer-appointment",
      {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        inr: data.inr,
        paisa: data.paisa,
        streetaddress: data.streetaddress,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
        phonenumber: data.phonenumber,
        email: data.email,
        age: data.age,
        trainerpreference: data.trainerpreference,
        physiotherapist: data.physiotherapist,
        packages: data.packages,
      },
    ]);
  }
}

/*,
 */
