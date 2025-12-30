"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    transporter;
    constructor() {
        // Initialize transporter immediately using environment variables
        this.transporter = nodemailer_1.default.createTransport({
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
    async verifyConnection() {
        try {
            await this.transporter.verify();
            console.log('✅ SMTP Connection established');
            return true;
        }
        catch (error) {
            console.error('❌ SMTP Connection failed:', error);
            return false;
        }
    }
    /**
     * Send an email
     */
    async sendEmail(options) {
        try {
            const info = await this.transporter.sendMail({
                from: options.from || process.env.EMAIL_FROM, // Default sender
                ...options,
            });
            console.log(`📧 Email sent: ${info.messageId}`);
            return true;
        }
        catch (error) {
            console.error('❌ Failed to send email:', error);
            throw error;
        }
    }
}
exports.EmailService = EmailService;
// Export a single instance to be used across the app
exports.emailService = new EmailService();
