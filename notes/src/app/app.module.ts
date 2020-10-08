import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NavtabComponent } from './pages/navtab/navtab.component';
import { NotesComponent } from './pages/notes/notes.component';
import { UpdateNotesComponent } from './pages/notes/update-notes/update-notes.component';
import { MainNotesComponent } from './pages/main.component';
import { CreateComponent } from './pages/notes/create/create.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BarRatingModule } from 'ngx-bar-rating';
import {MatMenuModule} from '@angular/material/menu';
import { ViewNoteDetailsComponent } from './pages/notes/view-note-details/view-note-details.component';
import { UserComponent } from './pages/user/user.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full'},
  { path: 'user/signup', component: SignupComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/:id', component: UserComponent, pathMatch: 'full' },
  { path: 'notes', component: MainNotesComponent},
  { path: 'notes/:_id', component: ViewNoteDetailsComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavtabComponent,
    NotesComponent,
    UpdateNotesComponent,
    MainNotesComponent,
    CreateComponent,
    ViewNoteDetailsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MaterialFileInputModule,
    RouterModule.forRoot(appRoutes),
    BarRatingModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateComponent
  ]
})
export class AppModule { }
