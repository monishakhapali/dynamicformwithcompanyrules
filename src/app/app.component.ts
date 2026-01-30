import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from './service/form-config.service';
import { FormFieldConfig } from '../FormFieldConfig';
import { debounceTime, distinctUntilChanged, of, Subscription, switchMap, tap } from 'rxjs';

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
  
  constructor(private fb: FormBuilder, private apiService: FormConfigService) {}
 
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
    const headerfield = this.formConfig.find(field => field.name === 'BookInformation');
    if(headerfield && headerfield.visible) {
    // Subscribe to fullName changes to control author visibility
    const bookNameControl = this.dynamicForm.get('bookName');
    if (bookNameControl) {
      this.subscription.add(
        bookNameControl.valueChanges
          .pipe(
            debounceTime(300),
            distinctUntilChanged()
          )
          .subscribe(value => {
            this.updateAuthorVisibility(value);
          })
      );
    }
  }
  }
  //This will drive the company rule for author field visibility
  updateAuthorVisibility(bookName: string): void {
    const authorField = this.formConfig.find(field => field.name === 'author');
    if (authorField) {
      authorField.visible = bookName !== 'Monisha';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
