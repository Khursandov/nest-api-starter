import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

export interface SMSPayload {
  mobile_phone: string;
  message: string;
  from: string;
}

export interface SMSSendResponse {
  id: string;
  status: string;
  message: string;
}

@Injectable()
export class SmsService {
  private readonly TOKEN = process.env.SMS_TOKEN;
  private readonly FROM = process.env.SMS_FROM;
  private readonly URL = process.env.SMS_URL;
  private readonly USERNAME = process.env.SMS_LOGIN;

  private $axios = axios.create({
    baseURL: this.URL,
  });

  public async send(to: string, message: string) {
    try {
      const { data } = await this.$axios.post<{ data: { token: string } }>(
        '/auth/login',
        {
          email: this.USERNAME,
          password: this.TOKEN,
        },
      );
      await this.$axios.post<any, AxiosResponse<SMSSendResponse>, SMSPayload>(
        '/message/sms/send',
        {
          from: this.FROM,
          message,
          mobile_phone: to.replace(/[\\s+]/g, ''),
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.data.token,
          },
        },
      );
      return true;
    } catch (err) {
      throw new HttpException(
        err.response.data.message,
        err.response.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
