import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { parse, Compile, VELOCITY_AST } from 'velocityjs';
import { UtilService } from '../../services/util.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-editor-and-preview',
  templateUrl: './editor-and-preview.component.html',
})
export class EditorAndPreviewComponent implements OnInit {
  templateEditorOptions = { theme: 'vs-dark', language: 'html' };
  velocityTemplate: string = '';
  templateDataEditorOptions = { theme: 'vs-dark', language: 'json' };
  templateData: string = '';
  previewHtmlEditorOptions = { theme: 'vs-dark', language: 'html', readOnly: true };
  previewHtml: string = '';
  sanitizedPreviewHtml: SafeHtml = '';
  templateGenerationInProgress: boolean = false;
  showHTMLOutput: boolean = false;

  constructor(
    private utilService: UtilService,
    private domSanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.setDefaultTemplate();
  }

  setDefaultTemplate(): void {
    this.velocityTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:22px 40px;background-color:#F7F7F7">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td>
                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Tracking Number</p>
                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">$trackingNumber</p>
                          </td>
                          <td align="right"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Track Package</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <img alt="Nike" height="22" src="https://velocity-template-preview.web.app/assets/example-images/nike-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" width="66" />
                    <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">It&#x27;s On Its Way.</h1>
                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">You order&#x27;s is on its way. Use the link above to track its progress.</p>
                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">We´ve also charged your payment method for the cost of your order and will be removing any authorization holds. For payment details, please visit your Orders page on Nike.com or in the Nike app.</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:15px;line-height:2;margin:0;font-weight:bold">Shipping to: $customerName</p>
                    <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">$shippingAddress</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:40px;padding-bottom:40px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td><img alt="$orderItem.productTitle" src="$orderItem.productImageUrl" style="display:block;outline:none;border:none;text-decoration:none;float:left" width="260px" /></td>
                          <td style="vertical-align:top;padding-left:12px">
                            <p style="font-size:14px;line-height:2;margin:0;font-weight:500">$orderItem.productTitle</p>
                            <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">$orderItem.productSubTitle</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex;margin-bottom:40px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td style="width:170px">
                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">$orderNumber</p>
                          </td>
                          <td>
                            <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
                            <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">$orderDate</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Order Status</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Top Picks For You</p>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px 0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          #foreach($product in $suggestedProducts)
                            <td align="center" style="vertical-align:top;text-align:left;padding-left:4px;padding-right:2px">
                              <img alt="$product.productTitle" src="$product.productImageUrl" style="display:block;outline:none;border:none;text-decoration:none;" width="100%" />
                              <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">$product.productTitle</p>
                              <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">$product.productSubTitle</p>
                            </td>
                          #end
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:20px;background-color:#F7F7F7">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:14px;line-height:24px;margin:16px 0;padding-left:20px;padding-right:20px;font-weight:bold">Get Help</p>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px;padding-left:20px;padding-right:20px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td colSpan="1" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping Status</a></td>
                          <td colSpan="1" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping &amp; Delivery</a></td>
                          <td colSpan="1" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Returns &amp; Exchanges</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0;padding-bottom:22px;padding-left:20px;padding-right:20px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td colSpan="1" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">How to Return</a></td>
                          <td colSpan="2" style="width:66%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Contact Options</a></td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:32px;padding-bottom:22px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td  style="width:16px"><img height="26px" src="https://velocity-template-preview.web.app/assets/example-images/phone.png" style="display:block;outline:none;border:none;text-decoration:none;padding-right:14px" width="16px" /></td>
                                  <td>
                                    <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">1-800-806-6453</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td>
                            <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">4 am - 11 pm PT</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Nike.com</p>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:370px;margin:auto;padding-top:12px">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td align="center"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Men</a></td>
                          <td align="center"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Women</a></td>
                          <td align="center"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Kids</a></td>
                          <td align="center"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Customize</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:166px;margin:auto">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td>
                            <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Web Version</p>
                          </td>
                          <td>
                            <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Privacy Policy</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© 2024 Nike, Inc. All Rights Reserved.</p>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.</p>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;

    this.templateData = `{
  "trackingNumber": "876GIUG9086JHL987",
  "customerName": "Nikola Tesla",
  "shippingAddress": "8 W 40th St, New York City",
  "orderItem": {
    "productImageUrl": "https://velocity-template-preview.web.app/assets/example-images/court-vision-low-next-nature-shoes-N2fFHb.png",
    "productTitle": "Nike Court Vision Low Next Nature",
    "productSubTitle": "Men's Shoes"
  },
  "orderNumber": "C0106373851",
  "orderDate": "June 9, 2024",
  "suggestedProducts": [
    {
      "productImageUrl": "https://velocity-template-preview.web.app/assets/example-images/brasilia-9-5-training-duffel-bag-h4sjmz.jpg",
      "productTitle": "Nike Brasilia 9.5",
      "productSubTitle": "Training Duffel Bag (Large, 95L)"
    },
    {
      "productImageUrl": "https://velocity-template-preview.web.app/assets/example-images/dri-fit-club-structured-metal-logo-cap-5MrZzL.png",
      "productTitle": "Nike Dri-FIT Club",
      "productSubTitle": "Structured Metal Logo Cap"
    },
    {
      "productImageUrl": "https://velocity-template-preview.web.app/assets/example-images/lebron-james-los-angeles-lakers-2024-select-series-dri-fit-nba-swingman-jersey-06QmSt.jpg",
      "productTitle": "LeBron James Los Angeles Lakers 2024 Select Series",
      "productSubTitle": "Men's Nike Dri-FIT NBA Swingman Jersey"
    }
  ]
}`;
  }

  ngOnInit(): void {
    this.generateAndUpdatePreview();
  }

  generateAndUpdatePreview(): void {
    try {
      const abstractSyntaxTree = parse(this.velocityTemplate);
      this.updatePreviewContent(abstractSyntaxTree);
    } catch (templateError: any) {
      this.utilService.showErrorToast('An error occured in Template', templateError.message);
    }
  }

  updatePreviewContent(abstractSyntaxTree: VELOCITY_AST[]): void {
    try {
      const context = JSON.parse(this.templateData);
      this.previewHtml = new Compile(abstractSyntaxTree).render(context);
      this.sanitizedPreviewHtml = this.domSanitizer.bypassSecurityTrustHtml(this.previewHtml);
      this.cdr.detectChanges();
    } catch (templateDataError: any) {
      this.utilService.showErrorToast('An error occured in Template Data', templateDataError.message);
    }
  }

  generateTemplateData(): void {
    if (this.templateGenerationInProgress) {
      return;
    }
    this.templateGenerationInProgress = true;
    this.utilService.getAiGeneratedTemplateData(this.velocityTemplate).subscribe({
        next: (response) => {
          this.templateData = response.response;
          this.generateAndUpdatePreview();
          this.templateGenerationInProgress = false;
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = error.error?.message || 'An error occured in generating Template data.';
          this.utilService.showErrorToast('Error', errorMessage);
          this.templateGenerationInProgress = false;
        },
      });
  }
}
