import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserDetail } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
userId: any = null;
imageSrc: any = '';
userInfo: {message: string, userId: string, user: UserDetail};
  constructor(
    public route: ActivatedRoute,
    public apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.userId = param.id;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.apiService.getUserDetails(this.userId).subscribe((result: {message: string, userId: string, user: UserDetail}) => {
      this.userInfo = result;
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // read file as data url
      reader.readAsDataURL(event.target.files[0]);
      // called once readAsDataURL is completed
      reader.onload = (elem) => {
        this.imageSrc = (elem.target as FileReader).result;
      };
    }
  }
  public deleteImage() {
    this.imageSrc = null;
  }

  // TODO: Remove not photo found if profile pic already uploaded


}
