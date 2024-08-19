import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { PrintingService } from '../../services/printer-service';
import { CommonModule } from '@angular/common';
import { PrintersDto, SetDefaultPrinterRequest } from '../../dtos/settings.dto';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProductionLineModel } from '../../models/production.line.model';
import { ProductionLineService } from '../../services/production.line.service';
import { SegmentModul } from '../../models/segment.model';
import { SegmentService } from '../../services/segment.service';

@Component({
  selector: 'app-packaging-settings',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
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
  
 constructor(private printingService: PrintingService, private fromBuilder: FormBuilder,
              private productionLineService: ProductionLineService, private segmentService: SegmentService
  ){
  this.printresFrom =  this.fromBuilder.group({
    default_printer:['',Validators.required]
  })

  this.lineSettings = this.fromBuilder.group({
    segment:[""],
    line:[""]
  })
 }


  ngOnInit(): void {
    this.printingService.getAllPrinters().pipe(
      tap(value =>{ this.printers.next(value)
      })
    ).subscribe()
    this.printresFrom.get('default_printer')?.valueChanges.subscribe(selectedPrinter => {
      this.printingService.setDefaultPrinter(new SetDefaultPrinterRequest(selectedPrinter)).subscribe(
        response => {
          console.log(response.message);
          // You can add additional logic here, like displaying a success message to the user
        },
        error => {
          console.error('Error setting default printer:', error);
          // Handle error, maybe show an error message to the user
        }
      );
    });
    

    // file production line select box 
    this.productionLineService.getAll().pipe(
      tap((value) => {
        this.allProductionLines.next(value)
        this.productionLines.next(value)
      })).subscribe()

    // file segment select box
    this.segmentService.getAllSegment().pipe(
      tap(value => {
        this.segments.next(value)
      })
    ).subscribe()
     
    // filter the line baseed on select segment

    this.lineSettings.get('segment')?.valueChanges.subscribe(segment => {
       let selectLines: ProductionLineModel[] = this.allProductionLines.getValue().filter(value => value.segment_id == segment)
       this.productionLines.next(selectLines)
       console.log(selectLines);
       
    })



  }

  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe()
    });
  }
}
