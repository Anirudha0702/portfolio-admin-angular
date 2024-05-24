import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IProject } from '../../Types';
import { DbService } from '../../Services/db.service';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  public id:string=""
  title = 'Project';
  loader = true;
  project = {} as IProject;
  email:string="anirudhapradhan403@gmail.com";
  constructor(private router: ActivatedRoute, private dbService: DbService) {}
  ngOnInit(): void {
    this.router.params.subscribe((param: Params) => {
      this.id = param['id'];
    });
    this.dbService.getProject(this.email,this.id).subscribe(
      (data:IProject) => (this.project = data),
      (error) => console.error('There was an error!', error)
    );
    this.loader = false;
  }
}
