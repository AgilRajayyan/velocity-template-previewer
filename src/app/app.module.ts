import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

import { HlmButtonDirective } from '../../spartan-ng-components/ui-button-helm/src/lib/hlm-button.directive';
import { HlmToasterComponent } from '../../spartan-ng-components/ui-sonner-helm/src/lib/hlm-toaster.component';
import { HlmTabsContentDirective } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs-content.directive';
import { HlmTabsListComponent } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs-list.component';
import { HlmTabsTriggerDirective } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs-trigger.directive';
import { HlmTabsComponent } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    HlmButtonDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmToasterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
