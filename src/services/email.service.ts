

import nodemailer, { Transporter } from 'nodemailer';

/**
 * Email service for sending emails through multiple providers
 */
export class EmailService {
  private static instance: EmailService;
  private transporter: Transporter | null = null;
  private provider: EmailProvider;
  private config: EmailConfig;

  private constructor(config?: EmailConfig) {
    this.config = config || this.getDefaultConfig();
    this.provider = this.config.provider || EmailProvider.SMTP;
  }

  /**
   * Get singleton instance of EmailService
   */
  static getInstance(config?: EmailConfig): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService(config);
    }
    return EmailService.instance;
  }

  /**
   * Initialize email transporter
   */
  private async initialize(): Promise<void> {
    if (this.transporter) return;

    try {
      switch (this.provider) {
        case EmailProvider.SMTP:
          this.transporter = nodemailer.createTransport({
            host: this.config.smtp?.host || 'smtp.gmail.com',
            port: this.config.smtp?.port || 587,
            secure: this.config.smtp?.secure || false,
            auth: {
              user: this.config.smtp?.auth?.user || process.env.SMTP_USER,
              pass: this.config.smtp?.auth?.pass || process.env.SMTP_PASS,
            },
          });
          break;
        
        case EmailProvider.SENDGRID:
          // Sendgrid configuration
          this.transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: 'apikey',
              pass: this.config.sendgrid?.apiKey || process.env.SENDGRID_API_KEY,
            },
          });
          break;
        
        case EmailProvider.AWS_SES:
          // AWS SES configuration would go here
          throw new Error('AWS SES provider not implemented yet');
        
        default:
          throw new Error(`Unknown email provider: ${this.provider}`);
      }

      // Verify connection
      await this.transporter.verify();
      logger.info(`Email service initialized with provider: ${this.provider}`);
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
      throw new EmailServiceError('Email service initialization failed', error);
    }
  }

  /**
   * Send an email
   * @param options Email options
   */
  async send(options: SendEmailOptions): Promise<EmailResult> {
    await this.initialize();

    if (!this.transporter) {
      throw new EmailServiceError('Email transporter not initialized');
    }

    const { to, subject, html, text, from, cc, bcc, attachments, replyTo } = options;

    try {
      const info = await this.transporter.sendMail({
        from: from || this.config.defaultFrom || 'noreply@example.com',
        to: Array.isArray(to) ? to.join(', ') : to,
        cc: cc ? (Array.isArray(cc) ? cc.join(', ') : cc) : undefined,
        bcc: bcc ? (Array.isArray(bcc) ? bcc.join(', ') : bcc) : undefined,
        subject,
        text,
        html,
        attachments,
        replyTo,
      });

      logger.info(`Email sent successfully to ${to}`, { messageId: info.messageId });

      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      };
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw new EmailServiceError('Failed to send email', error);
    }
  }

  /**
   * Send a welcome email to new users
   * @param recipient Recipient email
   * @param data Welcome email data
   */
  async sendWelcomeEmail(
    recipient: string,
    data: WelcomeEmailData
  ): Promise<EmailResult> {
    const { name, verificationUrl, companyName = 'Our Company' } = data;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Welcome to ${companyName}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f4f4f4; }
            .button { display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${companyName}!</h1>
            </div>
            <div class="content">
              <h2>Hi ${name},</h2>
              <p>Thank you for signing up! We're excited to have you on board.</p>
              <p>Please verify your email address by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email</a>
              </p>
              <p>If you didn't create an account, you can safely ignore this email.</p>
              <p>Best regards,<br>The ${companyName} Team</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
      Welcome to ${companyName}!
      
      Hi ${name},
      
      Thank you for signing up! We're excited to have you on board.
      
      Please verify your email address by visiting this link:
      ${verificationUrl}
      
      If you didn't create an account, you can safely ignore this email.
      
      Best regards,
      The ${companyName} Team
    `;

    return this.send({
      to: recipient,
      subject: `Welcome to ${companyName}!`,
      html,
      text,
    });
  }

  /**
   * Send bulk emails
   * @param recipients List of recipients
   * @param template Email template
   */
  async sendBulk(
    recipients: BulkRecipient[],
    template: EmailTemplate
  ): Promise<BulkEmailResult> {
    const results: EmailResult[] = [];
    const failed: Array<{ email: string; error: string }> = [];

    for (const recipient of recipients) {
      try {
        const html = this.processTemplate(template.html, recipient.data || {});
        const text = this.processTemplate(template.text, recipient.data || {});

        const result = await this.send({
          to: recipient.email,
          subject: this.processTemplate(template.subject, recipient.data || {}),
          html,
          text,
        });

        results.push(result);
      } catch (error) {
        failed.push({
          email: recipient.email,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      sent: results.length,
      failed: failed.length,
      failures: failed,
    };
  }

  /**
   * Process template with variables
   */
  private processTemplate(template: string, data: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  private getDefaultConfig(): EmailConfig {
    return {
      provider: EmailProvider.SMTP,
      defaultFrom: process.env.EMAIL_FROM || 'noreply@example.com',
      smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      },
    };
  }
}

// Types and Interfaces
export enum EmailProvider {
  SMTP = 'smtp',
  SENDGRID = 'sendgrid',
  AWS_SES = 'aws-ses',
  MAILGUN = 'mailgun',
}

export interface EmailConfig {
  provider?: EmailProvider;
  defaultFrom?: string;
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  sendgrid?: {
    apiKey: string;
  };
  awsSes?: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content?: Buffer | string;
    path?: string;
  }>;
}

export interface EmailResult<A, R> {
  success: boolean;
  messageId: string;
  accepted?: A[];
  rejected?: R[];
}

export interface BulkRecipient<D> {
  email: string;
  data?: Record<string, D>;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface BulkEmailResult {
  sent: number;
  failed: number;
  failures: Array<{ email: string; error: string }>;
}

export class EmailServiceError extends Error {
  constructor(message: string, public cause?: string) {
    super(message);
    this.name = 'EmailServiceError';
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();

/**
 * Example usage:
 * 
 * import { emailService } from '@/services/email';
 * 
 * // Send welcome email
 * await emailService.sendWelcomeEmail('user@example.com', {
 *   name: 'John Doe',
 *   verificationUrl: 'https://example.com/verify?token=xyz',
 *   companyName: 'Acme Corp'
 * });
 * 
 * // Send custom email
 * await emailService.send({
 *   to: 'user@example.com',
 *   subject: 'Password Reset',
 *   html: '<p>Click here to reset your password</p>',
 *   text: 'Click here to reset your password'
 * });
 */

// ============================================
// SMS SERVICE
// src/services/sms/index.ts
// ============================================

