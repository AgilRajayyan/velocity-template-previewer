import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { toast } from 'ngx-sonner';
import { parse, Compile } from 'velocityjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  templateEditorOptions = { theme: 'vs-dark', language: 'html' };
  templateDataEditorOptions = { theme: 'vs-dark', language: 'json' };
  velocityTemplate: string = `<!DOCTYPE html>
  <html>
  <head>
    <title>Email Template</title>
    <style>
      body { font-family: Arial, sans-serif; }
    </style>
  </head>
  <body>
    <p>Hello there,</p>
    <p>You could find two code editors above. One for the Velocity template and the other one for the template data in JSON format.</p>
    <p>Once you're done with the Velocity template and the template data, click on the "Generate Preview" button.</p>
    <p>Please note, it's not necessary to provide values for all the variables that you've in your template.</p>
    <p>Feel free to play around.</p>
    <h5>Example</h5>
    #if($products.size() > 0)
      <table style="border-collapse: collapse;border: 2px solid rgb(140 140 140);">
        <thead>
            <tr>
              <th style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">Name</th>
              <th style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">Price</th>
            </tr>
        </thead>
        <tbody>      
            #foreach($product in $products)
            <tr>
              <td style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">$product.name</td>
              <td style="border: 1px solid rgb(160 160 160);padding: 8px 10px; text-align: right;">
                #if ($product.strikeoffPrice)
                  <span style="text-decoration: line-through; font-size: 12px; color: red;">$$product.strikeoffPrice</span>
                #end
                <span style="font-weight: bold;">$$product.price</span>
              </td>
            </tr>
            #end
        </tbody>
      </table>
    #else
      <p>No products found</p>
    #end
  </body>
</html>`;
  templateData: string = `{
  "products": [
      { "name": "Product A", "price": 110, "strikeoffPrice": 124 },
      { "name": "Product B", "price": 45 },
      { "name": "Product C", "price": 299 }
  ]
}`;
  @ViewChild('previewContainer') previewContainer!: ElementRef;
  @ViewChild('htmlPreviewContainer') htmlPreviewContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.generatePreview();
  }

  generatePreview(): void {
    try {
      const abstractSyntaxTree = parse(this.velocityTemplate);
      try {
        const context = JSON.parse(this.templateData);
        const previewHtml: string = new Compile(abstractSyntaxTree).render(
          context
        );
        this.updatePreviewContent(previewHtml);
      } catch (templateDataError: any) {
        this.showErrorToast(
          'An error occured in Template Data',
          templateDataError.message
        );
      }
    } catch (templateError: any) {
      this.showErrorToast(
        'An error occured in Template',
        templateError.message
      );
    }
  }

  updatePreviewContent(previewHtml: string): void {
    this.previewContainer.nativeElement.innerHTML = previewHtml;
    this.htmlPreviewContainer.nativeElement.innerText = previewHtml;
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
