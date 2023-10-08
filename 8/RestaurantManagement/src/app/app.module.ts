import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowseComponent } from './browse/browse.component';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';

import { RecipeService } from './recipe.service';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'add', component: AddComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'update', component: UpdateComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BrowseComponent,
    AddComponent,
    DeleteComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
