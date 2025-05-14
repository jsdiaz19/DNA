import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: ()=>  import('./features/mutation/mutation.component').then( x=> x.MutationComponent)
    },
    {
        path:'**',
        redirectTo:''
    }
];
