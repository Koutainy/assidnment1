import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const msg = {
      to,
      from: this.configService.get<string>('FROM_EMAIL'),
      subject,
      text,
      html,
    };
    await sgMail.send(msg);
  }
}
