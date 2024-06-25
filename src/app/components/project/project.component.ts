import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IProject } from '../../Types';
import { DbService } from '../../Services/db.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  updateFlag = false;
  updateField = '';
  processing = false;
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
  startEdit(field:string){
    this.updateFlag = true;
    this.updateField = field;
    console.log('update flag set to true');
  }
  closeEdit(){
      this.updateFlag = false;
      this.updateField = '';
    console.log('update flag set to false');
  }

  updateProject(event:any,field:string){
    event.preventDefault();
   let  schema_field=''
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      
    }, 2000);
  }
}
