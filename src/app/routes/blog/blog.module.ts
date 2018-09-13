import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { CreateWizardComponent } from './create-wizard/create-wizard.component';

const routes: Routes = [
    {
        path: '',
        component: BlogComponent
    },
    {
        path: 'post/:slug',
        component: PostComponent
    },
    {
        path: 'category/:category',
        component: BlogComponent
    },
    {
        path: 'filter/:filter',
        component: BlogComponent
    },
    {
        path: 'create',
        component: CreateWizardComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [BlogComponent, PostComponent, CreateWizardComponent],
    exports: [
        RouterModule
    ]
})
export class BlogModule { }
