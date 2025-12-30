import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    // Initialize transporter immediately using environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Verify SMTP connection works
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('✅ SMTP Connection established');
      return true;
    } catch (error) {
      console.error('❌ SMTP Connection failed:', error);
      return false;
    }
  }

  /**
   * Send an email
   */
  async sendEmail(options: SendMailOptions): Promise<boolean> {
    try {
      const info = await this.transporter.sendMail({
        from: options.from || process.env.EMAIL_FROM, // Default sender
        ...options,
      });

      console.log(`📧 Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }
}

// Export a single instance to be used across the app
export const emailService = new EmailService();