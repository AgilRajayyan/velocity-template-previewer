import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MonacoEditorModule.forRoot(), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
