/* @flow */
import EmailLoggerProvider from '../logger'
import EmailNotificationCatcherProvider from './notificationCatcher'
import EmailSendGridProvider from './sendgrid'
import EmailSendmailProvider from './sendmail'
import EmailSmtpProvider from './smtp'
import EmailSparkPostProvider from './sparkpost'
// Types
import type {EmailRequestType} from '../../models/notification-request'

export interface EmailProviderType {
  id: string,
  send(request: EmailRequestType): Promise<string>
}

export default function factory ({type, ...config}: Object): EmailProviderType {
  switch (type) {
    // Development
    case 'logger':
      return new EmailLoggerProvider(config, 'email')

    case 'notificationcatcher':
      return new EmailNotificationCatcherProvider('email')

    // Custom
    case 'custom':
      return config

    // Protocols
    case 'sendmail':
      return new EmailSendmailProvider(config)

    case 'smtp':
      return new EmailSmtpProvider(config)

    // Providers
    case 'sendgrid':
      return new EmailSendGridProvider(config)

    case 'sparkpost':
      return new EmailSparkPostProvider(config)

    default:
      throw new Error(`Unknown email provider "${type}".`)
  }
}
