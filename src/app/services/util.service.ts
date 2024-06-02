import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toast } from 'ngx-sonner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private httpClient: HttpClient) {}

  sendEmail(payload: {
    recipientEmail: string;
    emailSubject: string;
    htmlContent: string;
  }): Observable<{ status: number; message: string }> {
    const apiUrl = 'https://velocity-template-preview-service.vercel.app/api/send-email';
    return this.httpClient.post(apiUrl, payload) as Observable<{ status: number; message: string; }>;
  }

  showErrorToast(title: string, errorMessage: string): void {
    toast(title, {
      description: errorMessage,
      action: {
        label: 'Ok',
        onClick: () => {},
      },
    });
  }
}
