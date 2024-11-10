import { ConfigService } from '@nestjs/config'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

export const getMailConfig = async (
	configService: ConfigService
): Promise<any> => {
	const transport = configService.get<string>('MAIL_TRANSPORT')
  const mailFromAddress = transport.split(':')[1].split('//')[1]

  return {
    transport,
    defaults: {
      from: `"Магазин цветов YourFlowers21" <${mailFromAddress}>`,
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      }
    }
  }
}
