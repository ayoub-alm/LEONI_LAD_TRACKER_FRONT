import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Subscription, tap } from 'rxjs';
import { PrintingService } from '../../services/printer-service';
import { CommonModule } from '@angular/common';
import { PrintLabelRequest, SetDefaultPrinterRequest } from '../../dtos/settings.dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductionLineModel } from '../../models/production.line.model';
import { ProductionLineService } from '../../services/production.line.service';
import { SegmentModul } from '../../models/segment.model';
import { SegmentService } from '../../services/segment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PackagingProcess } from '../../models/packaging.proccess.model';
import { PackagingProcessService } from '../../services/packaging-proccess.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-packaging-settings',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './packaging-settings.component.html',
  styleUrl: './packaging-settings.component.css'
})
export class PackagingSettingsComponent implements  OnInit, OnDestroy{

  subscription: Subscription[] = [];
  printers: BehaviorSubject<string[]> =  new BehaviorSubject<string[]>([]);
  printresFrom: FormGroup ;
  lineSettings: FormGroup;
  allProductionLines: BehaviorSubject<ProductionLineModel[]> = new BehaviorSubject<ProductionLineModel[]>([]);
  productionLines: BehaviorSubject<ProductionLineModel[]> = new BehaviorSubject<ProductionLineModel[]>([]);
  segments: BehaviorSubject<SegmentModul[]> = new BehaviorSubject<SegmentModul[]>([]);
  packagingProcess: BehaviorSubject<PackagingProcess[]> = new BehaviorSubject<PackagingProcess[]>([])
  defaultPrinter: string = "";
 constructor(private printingService: PrintingService, private fromBuilder: FormBuilder,
              private productionLineService: ProductionLineService, private segmentService: SegmentService,
              private snakeBar: MatSnackBar, private packagingProcessService: PackagingProcessService,
              private storageService : StorageService, private router: Router
  ){
    
  this.printresFrom =  this.fromBuilder.group({
    default_printer:['',Validators.required]
  })

  this.lineSettings = this.fromBuilder.group({
    segment:[""],
    line:[""],
    process:[""]
  })
 }


  ngOnInit(): void {
    // get all printers to file select box 
    this.printingService.getAllPrinters().pipe(
      tap(value =>{
         this.printers.next(value)
      })
    ).subscribe()
    
    this.printingService.getDefaultPrinter().pipe(tap(value => this.defaultPrinter = value.defaultPrinter)).subscribe()
    // change the default printer whene user select a specific printer 
    this.printresFrom.get('default_printer')?.valueChanges.subscribe(selectedPrinter => {
      this.printingService.setDefaultPrinter(new SetDefaultPrinterRequest(selectedPrinter)).subscribe(
        response => {
          this.snakeBar.open(response.message, 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error setting default printer:', error);
          this.snakeBar.open(error, 'Close', { duration: 3000 });
        }
      );
    });
    // change the selected procees whene value change and store the value on local storage
    this.lineSettings.get("process")?.valueChanges.pipe(
      tap(value => {
        const processId = parseInt(value, 10);
        if(value == 0 ){
          this.router.navigateByUrl('/packaging/create-process')
        }
        else if (!isNaN(processId)) {
          this.storageService.setItem('process_id', processId);
        } else {
          this.snakeBar.open('Invalid process ID', "Close");
        }
      })
    ).subscribe();
    // fill production line select box 
    this.productionLineService.getAll().pipe(
      tap((value) => {
        this.allProductionLines.next(value)
        this.productionLines.next(value)
      })).subscribe()

    // fill segment select box
    this.segmentService.getAllSegment().pipe(
      tap(value => {
        this.segments.next(value)
      })
    ).subscribe()
     
    // get all lines for line select box 
    this.lineSettings.get('segment')?.valueChanges.subscribe(segment => {
       let selectLines: ProductionLineModel[] = this.allProductionLines.getValue().filter(value => value.segment_id == segment)
       this.productionLines.next(selectLines)       
    })
   // get packaging process 
   this.packagingProcessService.getAllProcesses().pipe(
    tap(packagingProcess => {
      this.packagingProcess.next(packagingProcess)
      this.selectDefaultProcess()
    })
   ).subscribe()

      
  }
  /**
   *This function allows us to print a test label 
   */
  printTestLable() {
    let labelContent = new PrintLabelRequest("000000", "Test label")
    this.printingService.printLable(labelContent).subscribe(res => {
      this.snakeBar.open(res.message , "Close")
    })

  }
/**
 * 
 */
    selectDefaultProcess(){
      const storedProcessId = this.storageService.getItem('process_id');
      if (storedProcessId !== null) {
        this.lineSettings.get('process')?.setValue(parseInt(storedProcessId, 10));
      }
    }


    get getDefaultPrinter(): string{
      return this.defaultPrinter
    }

/**
 * This function destroy all subscription after destry the component 
 */
  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe()
    });
  }
}