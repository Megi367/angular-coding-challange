import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { ApiService } from 'src/app/shared/api.service';
import { ProfileModel } from './profile.model';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profiles: Profile[];
  profileForm!:FormGroup;
  profileModelObject: ProfileModel = new ProfileModel();
  closeResult='';


  constructor(private api:ApiService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder) {
              this.profiles=[]
            }

  ngOnInit(): void {
    this.getAllProfiles();

    this.profileForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: ['']
    })
  }

// CRUDS from the API Service
  getAllProfiles(){
    this.api.getProfiles()
    .subscribe(res =>{this.profiles = res as Profile[]
    })
  }

  updateProfileDetails(){
    this.profileModelObject.username= this.profileForm.value.username;
    this.profileModelObject.email= this.profileForm.value.email;
    this.profileModelObject.password= this.profileForm.value.password;

    this.api.updateProfiles(this.profileModelObject, this.profileModelObject.id)
    .subscribe(res=>{
      alert("Profile Updated Successfully!");
      this.profileForm.reset();
      this.getAllProfiles();
    }, err=>{
      alert("Something went wrong!")
    }
    )
  }

  deleteProfile(profile:any){
    this.api.deleteProfiles(profile.id)
    .subscribe(res=>{
      alert("Profile Deleted");
      this.getAllProfiles();
    })
  }

  // Editing the existing profiles on Edit Button
  onEdit(profile: any, content:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.profileModelObject.id = profile.id;
    this.profileForm.controls['username'].setValue(profile.username);
    this.profileForm.controls['email'].setValue(profile.email);
    this.profileForm.controls['password'].setValue(profile.password);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
