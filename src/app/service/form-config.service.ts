import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormFieldConfig } from '../../FormFieldConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  private formconfigUrl = 'assets/FormConfig.json';

  constructor(private http: HttpClient) { }

  getFormConfig(): Observable<FormFieldConfig[]> {
    return this.http.get<FormFieldConfig[]>(this.formconfigUrl);
  }

}
