import { LayoutComponent } from '../layout/layout/layout.component';
import { LoginComponent } from './login/login.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'blog', pathMatch: 'full' },
            { path: 'blog', loadChildren: './blog/blog.module#BlogModule' }
        ]
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },

    // Not found
    { path: '**', redirectTo: 'blog' }

];
