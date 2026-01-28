export interface FormFieldConfig {
  type: 'text' | 'dropdown' | 'header';
  label: string;
  name: string;
  required: boolean;
  visible?: boolean; // Property from API to control visibility
  Section?: string; // Property from API to group fields into sections
}