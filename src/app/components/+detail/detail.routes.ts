import { DetailComponent } from './detail.component';

export const routes = [
  { path: '', children: [
    { path: '', component: DetailComponent }
  ]},
];
