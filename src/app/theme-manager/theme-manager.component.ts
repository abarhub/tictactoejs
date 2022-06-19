import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {ThemeModel} from '../model/theme.model';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.scss']
})
export class ThemeManagerComponent implements OnInit {

  themeForm: UntypedFormGroup;
  themeList: ThemeModel[] = [{
    id: 1,
    name: 'Sombre'
  },
    {
      id: 2,
      name: 'Clair'
    },
    {
      id: 3,
      name: 'Clair 2'
    }];

  constructor(private fb: UntypedFormBuilder) {
    this.themeForm = this.fb.group({
      themeControl: [this.themeList[0]]
    });
  }

  ngOnInit(): void {
    this.changeTheme();
  }

  changeTheme(): void {
    const themeSelected = this.themeForm.get('themeControl')?.value;
    if (themeSelected && this.isThemeModel(themeSelected)) {
      const theme2: ThemeModel = themeSelected;
      const id = theme2.id;
      if (id) {
        if (id >= 1 && id <= 3) {
          if (id === 1) {
            this.changeThemeStyle('var(--theme1-primary-color)', 'var(--theme1-secondary-color)', 'var(--theme1-background-color)');
          } else {
            this.changeThemeStyle('var(--theme2-primary-color)', 'var(--theme2-secondary-color)', 'var(--theme2-background-color)');
          }
        }
      }
    }
  }

  private isThemeModel(obj: any): obj is ThemeModel {
    return obj.id !== undefined;
  }

  private changeThemeStyle(primary: string, secondary: string, background: string): void {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--secondary-color', secondary);
    document.documentElement.style.setProperty('--background-color', background);
  }

  compareThemeModel(c1: ThemeModel, c2: ThemeModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
