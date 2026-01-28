import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormFieldConfig } from '../../FormFieldConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyrulesService {

    private formconfigUrl = 'assets/CompanyConfig.json';


  constructor(private http: HttpClient) { }

   getFormConfig(): Observable<FormFieldConfig[]> {
        return this.http.get<FormFieldConfig[]>(this.formconfigUrl).pipe(
            map(formConfig => formConfig.filter(config => config.name === 'age'))
        );
     }
}
