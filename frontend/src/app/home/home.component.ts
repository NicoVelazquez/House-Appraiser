import {Component, OnInit} from '@angular/core';
import {ScrapperService} from '../services/scrapper.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-house-info',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countries = [
    {name: 'El Lucero', type: 'barrio', url: 'https://www.zonaprop.com.ar/casa-venta-el-lucero'},
    {name: 'Ayres del Pilar', type: 'barrio', url: 'https://www.zonaprop.com.ar/casa-venta-ayres-del-pilar'},
  ];
  filteredCountries = [];
  countryForm: FormGroup;
  enableButton = false;

  selectedCountry = '';

  constructor(private scrapperService: ScrapperService, private fb: FormBuilder, private router: Router) {
    this.countryForm = fb.group({
      name: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.displayCountries();
  }

  displayCountries() {
    this.countryForm.get('name').valueChanges.subscribe((text: string) => {
      if (text !== null) {
        this.filteredCountries = this.countries.filter(c => {
          return c.name.toLowerCase().includes(text.toLowerCase());
        });
      }
      this.enableButton = false;
    });
  }

  setCountry(c: any) {
    this.countryForm.patchValue({name: c.name});
    this.selectedCountry = c;
    this.filteredCountries = [];
    this.enableButton = true;
  }

  closeDropdown() {
    this.filteredCountries = [];
  }

  continue() {
    this.scrapperService.setCountry(this.selectedCountry);
    this.router.navigate(['/house-information']);


  }

}
