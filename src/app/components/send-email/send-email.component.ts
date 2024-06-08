import { Component, input } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html'
})
export class SendEmailComponent {
  emailFormGroup: FormGroup;
  previewHtml = input<string>();
  emailSendingInProgress: boolean = false;

  constructor(
    private utilService: UtilService,
    private formBuilder: FormBuilder
  ) {
    this.emailFormGroup = this.formBuilder.nonNullable.group({
      recipientEmail: ['', [Validators.required, Validators.email]],
      emailSubject: [
        '[Test Email] Sent from velocity-template-preview.web.app 😉',
      ],
    });
  }

  get recipientEmail() {
    return this.emailFormGroup.get('recipientEmail') as FormControl;
  }

  sendEmail(): void {
    if (this.emailFormGroup.invalid) {
      this.emailFormGroup.markAllAsTouched();
      return;
    }
    if (this.emailSendingInProgress) {
      return;
    }
    this.emailSendingInProgress = true;
    const payload = {
      ...this.emailFormGroup.value,
      htmlContent: this.previewHtml(),
    };
    this.utilService.sendEmail(payload).subscribe({
      next: () => {
        this.emailSendingInProgress = false;
        this.utilService.showErrorToast('Success', 'Email sent successfully.');
      },
      error: (error: HttpErrorResponse) => {
        this.emailSendingInProgress = false;
        const errorMessage = error.error?.message || 'An error occured in sending the mail.'
        this.utilService.showErrorToast('Error', errorMessage);
      }
    });
  }
}
