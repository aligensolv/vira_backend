import { SendMailOptions } from 'nodemailer';
export declare class EmailService {
    private transporter;
    constructor();
    /**
     * Verify SMTP connection works
     */
    verifyConnection(): Promise<boolean>;
    /**
     * Send an email
     */
    sendEmail(options: SendMailOptions): Promise<boolean>;
}
export declare const emailService: EmailService;
