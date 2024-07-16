import { Module } from '@nestjs/common';
import * as path from 'path';
import {
  CookieResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/'),
        watch: true,
      },
      loader: I18nJsonLoader,
      resolvers: [
        { use: HeaderResolver, options: ['lang'] },
        new QueryResolver(['lang', 'locale', 'l']),
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
  ],
})
export class I18nConfigModule {}
