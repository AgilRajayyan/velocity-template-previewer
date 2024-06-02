import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HlmButtonDirective } from '../../spartan-ng-components/ui-button-helm/src/lib/hlm-button.directive';
import { HlmToasterComponent } from '../../spartan-ng-components/ui-sonner-helm/src/lib/hlm-toaster.component';
import { HlmTabsContentDirective } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs-content.directive';
import { HlmTabsListComponent } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs-list.component';
import { HlmTabsTriggerDirective } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs-trigger.directive';
import { HlmTabsComponent } from '../../spartan-ng-components/ui-tabs-helm/src/lib/hlm-tabs.component';
import { HlmLabelDirective } from '../../spartan-ng-components/ui-label-helm/src/lib/hlm-label.directive';
import { HlmInputDirective } from '../../spartan-ng-components/ui-input-helm/src/lib/hlm-input.directive';
import { HlmSpinnerComponent } from '../../spartan-ng-components/ui-spinner-helm/src/lib/hlm-spinner.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HlmCardContentDirective } from '../../spartan-ng-components/ui-card-helm/src/lib/hlm-card-content.directive';
import { HlmCardDescriptionDirective } from '../../spartan-ng-components/ui-card-helm/src/lib/hlm-card-description.directive';
import { HlmCardHeaderDirective } from '../../spartan-ng-components/ui-card-helm/src/lib/hlm-card-header.directive';
import { HlmCardTitleDirective } from '../../spartan-ng-components/ui-card-helm/src/lib/hlm-card-title.directive';
import { HlmCardDirective } from '../../spartan-ng-components/ui-card-helm/src/lib/hlm-card.directive';
import { EditorAndPreviewComponent } from './components/editor-and-preview/editor-and-preview.component';

@NgModule({
  declarations: [AppComponent, EditorAndPreviewComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmToasterComponent,
    HlmLabelDirective,
    HlmInputDirective,
    HlmSpinnerComponent,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
