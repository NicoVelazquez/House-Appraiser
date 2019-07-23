import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScrapperService} from '../services/scrapper.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css']
})
export class HomeInfoComponent implements OnInit, OnDestroy {

  public houseForm: FormGroup;
  public subscription: Subscription;

  public loading = false;

  public brightnessStatus = [{name: 'Muy Luminoso', selected: false}, {name: 'Luminoso', selected: false}];
  public propertyStatus = [{name: 'Excelente', selected: false}, {name: 'Muy Bueno', selected: false}];

  constructor(private scrapperService: ScrapperService, private fb: FormBuilder) {
    this.houseForm = fb.group({
      totalArea: new FormControl(null, [Validators.required]),
      coveredArea: new FormControl(null, [Validators.required]),
      rooms: new FormControl(null, [Validators.required]),
      bedrooms: new FormControl(null, [Validators.required]),
      bathrooms: new FormControl(null, [Validators.required]),
      toilette: new FormControl(null, [Validators.required]),
      garages: new FormControl(null, [Validators.required]),
      antiquity: new FormControl(null, [Validators.required]),
      brightness: new FormControl('Muy Luminoso', [Validators.required]),
      property: new FormControl('Excelente', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log(this.scrapperService.countrySource.getValue());
  }

  finished() {
    this.loading = true;

    this.subscription = this.scrapperService.finishedScrapping.subscribe(value => {
      if (value === 'finished') {
        this.scrapperService.setHouse(this.houseForm.value).then((res) => {
          this.loading = false;
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  changeBrighStatus(bS: any) {
    this.houseForm.patchValue({
      brightness: bS
    });
  }

  changePropStatus(pS: any) {
    this.houseForm.patchValue({
      property: pS
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
