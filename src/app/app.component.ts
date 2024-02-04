import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { parse, Compile } from 'velocityjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  templateEditorOptions = { theme: 'vs-dark', language: 'html' };
  templateDataEditorOptions = { theme: 'vs-dark', language: 'json' };
  velocityTemplate: string = `
    <h2>Conditionals</h2>
    #if ($renderIfBlock)
        <p>If block is rendered since renderIf flag is true.</p>
    #else
        <p>Else block is rendered since renderIf flag is false.</p>
    #end

    <h2>Products</h2>
    #if($products.size() > 0)
      <table style="border-collapse: collapse;border: 2px solid rgb(140 140 140);">
        <thead>
            <tr>
                <th style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">Name</th>
                <th style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">Description</th>
            </tr>
        </thead>
        <tbody>
            #foreach($product in $products)
            <tr>
                <td style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">$product.name</td>
                <td style="border: 1px solid rgb(160 160 160);padding: 8px 10px;">$product.description</td>
            </tr>
            #end
        </tbody>
      </table>
    #else
      <p>No products found</p>
    #end`;
  templateData: string = `
    {
      "renderIfBlock": true,
      "products": [
          { "name": "Product A", "description": "Product A description" },
          { "name": "Product B", "description": "Product B description" },
          { "name": "Product C", "description": "Product C description" }
      ]
    }`;
  @ViewChild('previewContainer') previewContainer!: ElementRef;
  previewHtml: string = '';
  previewType: 'HTML' | 'ACTUAL-OUTPUT' = 'ACTUAL-OUTPUT';

  ngAfterViewInit(): void {
    this.generatePreview();
  }

  generatePreview(): void {
    const abstractSyntaxTree = parse(this.velocityTemplate);
    const context = JSON.parse(this.templateData);
    this.previewHtml = new Compile(abstractSyntaxTree).render(context);
    this.updatePreviewContent();
  }

  onChangePreviewType(previewType: 'HTML' | 'ACTUAL-OUTPUT'): void {
    this.previewType = previewType;
    this.updatePreviewContent();
  }

  updatePreviewContent(): void {
    if (this.previewType === 'HTML') {
      this.previewContainer.nativeElement.innerText = this.previewHtml;
    } else {
      this.previewContainer.nativeElement.innerHTML = this.previewHtml;
    }
  }
}
