import { Component, OnInit } from '@angular/core';
import { DbService } from '../../Services/db.service';
import { IProject } from '../../Types';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  email: string;
  processing=false;
  projects: IProject[] = [];
  selectedFile: File | null = null;
  uploadedImageUrl: string | null = null;
  addProjectFlag = false;
  uploading = false;
  constructor(private db: DbService, private router: Router,private auth:AuthService) {
    this.email = this.auth.getEmail();
  }
  ngOnInit(): void {
    this.db.getProjects(this.email).subscribe((data: IProject[]) => {
      this.projects = data;
    });
  }
  openModal() {
    this.addProjectFlag = true;
  }
  closeModal() {
    this.addProjectFlag = false;
  }
  onChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  async addProject(event: any) {
    event.preventDefault();
    this.uploading = true;
    this.processing=true;
    try {
      const form = event.target;
      const formdata = new FormData(form);
      if (this.selectedFile === null) {
        this.uploading = false;
        return;
      }
      const url = await this.db.uploadToStorage(this.selectedFile);
      if (url === null) {
        this.uploading = false;
        return;
      }
      this.uploadedImageUrl = url;

      const project = {
        title: formdata.get('title') as string,
        description: formdata.get('description') as string,
        image: this.uploadedImageUrl as string,
        github: formdata.get('github') as string,
        live: formdata.get('live') as string,
        techStack: formdata.get('techStack') as string,
      };
      console.log(project);
      this.db.addToDb(this.email, project).subscribe((data) => {
        
      });
      this.db.getProjects(this.email).subscribe((data: IProject[]) => {
        this.projects = data;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.uploading = false;
      this.processing=false;
      this.closeModal();
    }
  }
}
