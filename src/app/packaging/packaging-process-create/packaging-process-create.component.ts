import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { PostService } from "../../services/post.service";
import {BehaviorSubject, concatMap, tap} from "rxjs";
import { PostModel } from "../../models/post.model";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PackagingStepDTO } from "../../dtos/create.packaging.step.dto";
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { MatBadgeModule } from "@angular/material/badge";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HarnessService} from "../../services/harness.service";
import {PackagingProcessService} from "../../services/packaging-proccess.service";
import {PackagingStepService} from "../../services/packaging.step";
import { SegmentService } from '../../services/segment.service';
import { SegmentModul } from '../../models/segment.model';

@Component({
  selector: 'app-packaging-process-create',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckbox, MatBadgeModule
  ],
  templateUrl: './packaging-process-create.component.html',
  styleUrls: ['./packaging-process-create.component.css']
})
export class PackagingProcessCreateComponent implements OnInit {
  posts: BehaviorSubject<PostModel[]> = new BehaviorSubject<PostModel[]>([]);
  packagingStepDto: BehaviorSubject<PackagingStepDTO[]> = new BehaviorSubject<PackagingStepDTO[]>([]);
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  processForm: FormGroup;
  packagingProcessForm: FormGroup;
  families:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  packaginProccesId: BehaviorSubject<number> = new BehaviorSubject(0)
  segments: BehaviorSubject<SegmentModul[]> = new BehaviorSubject<SegmentModul[]>([])

  /**
   *
   * @param postService
   * @param formBuilder
   * @param snackBar
   * @param harnessService
   * @param packagingProcessService
   * @param packagingStepService
   */
  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private segmentService: SegmentService,
              private harnessService: HarnessService,
              private packagingProcessService:PackagingProcessService,
              private packagingStepService: PackagingStepService ) {
    this.processForm = this.formBuilder.group({});
    this.packagingProcessForm = this.formBuilder.group({
      segment:['', Validators.required],
      processName:["", Validators.required],
    });
  }

  /**
   *
   */
  ngOnInit(): void {
   
   this.segmentService.getAllSegment().pipe(
    tap((segments)=>{
      this.segments.next(segments)
    })).subscribe()

    this.postService.getAllPosts().subscribe(posts => {
      this.posts.next(posts);
      posts.forEach(post => {
        post.fields.forEach(field => {
          this.processForm.addControl(post.name + "#" + field.name + '#' + 'pre-fix', this.formBuilder.control({
            value: '',
            disabled: true
          }, ));
          this.processForm.addControl(post.name + "#" + field.name + '#' + 'img', this.formBuilder.control({
            value: '',
            disabled: true
          }, [Validators.required, Validators.minLength(2)]));
          this.processForm.addControl(post.name + "#" + field.name, this.formBuilder.control(false));
        });
      });
    });

    this.processForm.valueChanges.pipe(tap(() => {
      this.onSave();
    })).subscribe();


  }

  /**
   *
   */
  onSave() {
    this.packagingStepDto.next([]);
    const data = this.processForm.getRawValue();
    const postFields = Object.keys(data).filter(key => key.split('#').length === 2 && data[key]);
    postFields.forEach((field, index) => {
      const pre_fix = this.processForm.get(field + '#' + 'pre-fix')?.getRawValue();
      const image = this.processForm.get(field + '#' + 'img')?.getRawValue();
      const step: PackagingStepDTO = new PackagingStepDTO({
        preFix: pre_fix,
        fieldId: 1,
        status: 1,
        description: 'Scan the ' + field.split('#')[0] + ' ' + field.split('#')[1],
        packagingProcessId: 1,
        order: index + 1,
        name: field,
        img: image
      });
      this.packagingStepDto.next([...this.packagingStepDto.getValue(), step]);
    });
  }

  /**
   *
   * @param $event
   */
  change($event: MatCheckboxChange) {
    const fieldName = $event.source.id;
    if ($event.checked) {
      this.processForm.get(fieldName + '#' + 'img')?.enable();
      this.processForm.get(fieldName + '#' + 'pre-fix')?.enable();
    } else {
      this.processForm.get(fieldName + '#' + 'img')?.disable();
      this.processForm.get(fieldName + '#' + 'pre-fix')?.disable();
      this.processForm.get(fieldName + '#' + 'img')?.setValue('');
      this.processForm.get(fieldName + '#' + 'pre-fix')?.setValue('');
    }
  }

  /**
   *
   * @param event
   */
  drop(event: CdkDragDrop<string[]>) {
    this.packagingStepDto.subscribe(fields => {
      moveItemInArray(fields, event.previousIndex, event.currentIndex);
      fields.forEach((field, index: number) => {
        field.order = index + 1;
      });
    });
  }

  /**
   *
   * @param event
   * @param fieldName
   */
  // onFileChange(event: Event, fieldName: string) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.processForm.get(fieldName)?.setValue(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onFileChange(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        // Base64-encoded image result
        const base64Image = reader.result as string;
  
        // Set the base64-encoded image in the form control
        this.processForm.get(fieldName)?.setValue(base64Image);
      };
  
      reader.readAsDataURL(file); // Read file as base64
    }
  }
  

  /**
   *
   * @constructor
   */
  OnSubmit() {
    if (this.processForm.invalid || this.packagingProcessForm.invalid) {
      this.snackBar.open('Some fields are invalid. Please check.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'danger-snackBar'
      });
    } else {
      const steps = this.packagingStepDto.getValue(); // Get all steps including base64-encoded images
  
      this.packagingProcessService.createProcess(
        this.packagingProcessForm.get('segment')?.getRawValue(),
        1,
        this.packagingProcessForm.get('processName')?.getRawValue()
      ).pipe(
        concatMap(response => {
          if (response) {
            this.snackBar.open('Packaging process saved successfully.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            steps.map(step => step.packagingProcessId = response.id);
            return this.packagingStepService.bulkCreatePackagingStep(steps); // Send the bulk steps with images to the backend
          } else {
            this.snackBar.open('Failed to save packaging process. Please try again later.', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'danger-snackBar'
            });
            throw new Error('Failed to save packaging process');
          }
        })
      ).subscribe(
        (response: PackagingStepDTO[]) => {
          this.snackBar.open('Packaging steps saved successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          console.log(response);
        },
        error => {
          this.snackBar.open('Failed to save packaging steps. Please try again later.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'danger-snackBar'
          });
          console.error('Error sending packaging steps', error);
        }
      );
    }
  }
  
  /**
   *
   * @param postName
   */
  isDragDisabled(postName: string): boolean {
    return postName === 'packaging';
  }

  /**
   *
   * @param formControlName
   */
  hasError(formControlName: string): boolean{
    return <boolean>this.processForm.get(formControlName)?.hasError('required')
  }


  addNewStep(){}
}
