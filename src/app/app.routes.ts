import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { RecitersComponent } from './components/reciters/reciters.component';
import { HelpComponent } from './components/help/help.component';
import { ChapterComponent } from './components/chapter/chapter.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quran',
    component: ChapterComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'reciters',
    component: RecitersComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
];
