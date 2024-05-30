import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {PostService} from "../../services/post.service";
import {BehaviorSubject, tap} from "rxjs";
import {PostModel} from "../../models/post.model";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PackagingStepDTO} from "../../dtos/create.packaging.step.dto";
import {CdkDragDrop, DragDropModule, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-admin-packaging-process-create',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckbox,MatBadgeModule
  ],
  templateUrl: './admin-packaging-process-create.component.html',
  styleUrl: './admin-packaging-process-create.component.css'
})
export class AdminPackagingProcessCreateComponent implements OnInit{
  posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([])
  packagingStepDto: BehaviorSubject<PackagingStepDTO[]> =  new BehaviorSubject<PackagingStepDTO[]>([])
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  processForm:FormGroup = this.formBuilder.group({
    // 'packaging#HarnessRef':[true],
    // 'packaging#HarnessRef#img':[''],
    // 'packaging#HarnessRef#pre-fix':[''],
    //
    // 'packaging#packageBarCode':[true],
    // 'packaging#packageBarCode#img':[''],
    // 'packaging#packageBarCode#pre-fix':[''],
    //
    // 'packaging#packageQuantity':[true],
    // 'packaging#packageQuantity#img':[''],
    // 'packaging#packageQuantity#pre-fix':[''],
    //
    //
    // 'packaging#packageSize':[true],
    // 'packaging#packageSize#img':[''],
    // 'packaging#packageSize#pre-fix':['']
  });
  constructor(private postService: PostService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts.next(posts);
        posts.forEach(post => {
          post.fields.forEach(field => {
            this.processForm.addControl( post.name +"#"+ field.name+'#'+'pre-fix', this.formBuilder.control({value: '', disabled: true},{}))
            this.processForm.addControl( post.name +"#"+ field.name+'#'+'img', this.formBuilder.control("",{}))
            this.processForm.addControl( post.name +"#"+ field.name, this.formBuilder.control(''))
          });
        });
      });


      this.processForm.valueChanges.pipe(tap(value => {this.onSave()})).subscribe()
  }



  onSave(){
    // delete old data
    this.packagingStepDto.next([])
    // get data from the form
    const data = this.processForm.getRawValue()
    // get checked fields
    let postField = Object.keys(data).filter(key =>
      key.split('#').length === 2 && data[key] != null && data[key] != '');
    postField.forEach((field, index)=>{
      // get the pre-fix value
      let pre_fix  = this.processForm.get(field+'#'+'pre-fix')?.getRawValue();
      // get the image value
      let image = this.processForm.get(field+'#'+'img')?.getRawValue();


      let step: PackagingStepDTO = new PackagingStepDTO({ preFix: pre_fix,
        fieldId: 1,
        status: 1,
        description: 'san the ' + field.split('#')[0] + ' '+  field.split('#')[1] ,
        packagingProcessId: 1,
        order: index + 1,
        name:field,
        img:image
      })
      this.packagingStepDto.next([... this.packagingStepDto.getValue(),step])
    })
    console.log(this.packagingStepDto.getValue());
  }

  chane($event: MatCheckboxChange) {
    if(!$event.checked){
      this.processForm.get($event.source.id+'#'+'pre-fix')?.setValue("")
      this.processForm.get($event.source.id+'#'+'img')?.setValue("")
      this.processForm.get($event.source.id+'#'+'img')?.disable()
      this.processForm.get($event.source.id+'#'+'pre-fix')?.disable()
    }else {
      this.processForm.get($event.source.id+'#'+'img')?.enable()
      this.processForm.get($event.source.id+'#'+'pre-fix')?.enable()
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    this.packagingStepDto.subscribe(fields => {
      moveItemInArray(fields, event.previousIndex, event.currentIndex);
      fields.forEach((field , index : number) => {
        field.order = index+1
      });
    });

    console.log(this.packagingStepDto.getValue());
  }


  onFileChange(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {

        this.processForm.get(fieldName)?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }



  isDragDisabled(postName: string): boolean {
    return postName === 'packaging'
  }

  OnSubmit() {
    // if (this.processForm.hasError())
  }
}
