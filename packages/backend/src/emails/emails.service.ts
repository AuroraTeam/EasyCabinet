import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/render';
import { Transporter, createTransport } from 'nodemailer';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import ResetPassword from './templates/reset-password';

@Injectable()
export class EmailsService {
  private readonly transporter:
    | Transporter<SendmailTransport.SentMessageInfo, SendmailTransport.Options>
    | Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

  private readonly from = this.configService.get<string>('EMAIL_FROM');

  constructor(private readonly configService: ConfigService) {
    const useSendmail =
      configService.get<string>('USE_SENDMAIL', 'false') == 'true';

    if (useSendmail) {
      this.transporter = createTransport({ sendmail: true });
    } else {
      const host = configService.getOrThrow<string>('SMTP_HOST');
      const port = +configService.get<string>('SMTP_PORT', '587');
      const secure =
        configService.get<string>('SMTP_SECURE', 'false') === 'true';

      const user = configService.getOrThrow<string>('SMTP_USER');
      const pass = configService.getOrThrow<string>('SMTP_PASS');

      this.transporter = createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
    }
  }

  sendEmail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({ from: this.from, to, subject, html });
  }

  async sendResetPasswordEmail(email: string, resetToken: string) {
    const html = await this.renderResetPasswordTemplate(resetToken);
    return this.sendEmail(email, 'Сброс пароля', html);
  }

  renderResetPasswordTemplate(resetToken: string) {
    const baseUrl = this.configService.get<string>('FRONTEND_URL');
    const projectName = this.configService.get<string>(
      'PROJECT_NAME',
      'EasyCabinet',
    );

    return render(ResetPassword({ projectName, baseUrl, resetToken }));
  }
}
