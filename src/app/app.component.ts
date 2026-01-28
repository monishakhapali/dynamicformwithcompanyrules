import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from './service/form-config.service';
import { FormFieldConfig } from '../FormFieldConfig';
import { debounceTime, distinctUntilChanged, of, Subscription, switchMap, tap } from 'rxjs';
import { CompanyrulesService } from './service/companyrules.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  dynamicForm: FormGroup = new FormGroup({});
  formConfig: FormFieldConfig[] = [];
  isLoading: boolean = false;
  private subscription: Subscription = new Subscription();
  
  constructor(private fb: FormBuilder, private apiService: FormConfigService, private companyRulesService: CompanyrulesService) {}
 
  ngOnInit(): void {
    this.fetchFormConfig();
      
 
  }

  fetchFormConfig(): void {
    this.apiService.getFormConfig().subscribe(config => {
      this.formConfig = config;
      this.buildForm();
    });
    
   
  }

  buildForm(): void {
    const formControls: any = {};
    this.formConfig.forEach(field => {
      formControls[field.name] = [
        { value: '', disabled: !field.visible }, // You could also set initial disabled state
        field.required ? Validators.required : null
      ];
    });
    this.dynamicForm = this.fb.group(formControls);
    const headerfield = this.formConfig.find(field => field.name === 'PersonalInformation');
    if(headerfield && headerfield.visible) {
    // Subscribe to fullName changes to control age visibility
    const fullNameControl = this.dynamicForm.get('fullName');
    if (fullNameControl) {
      this.subscription.add(
        fullNameControl.valueChanges
          .pipe(
            debounceTime(300),
            distinctUntilChanged()
          )
          .subscribe(value => {
            this.updateAgeVisibility(value);
          })
      );
    }
  }
  }
  //This will drive the company rule for age field visibility
  updateAgeVisibility(fullName: string): void {
    const ageField = this.formConfig.find(field => field.name === 'age');
    if (ageField) {
      ageField.visible = fullName !== 'Monisha';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
