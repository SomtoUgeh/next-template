import { Body } from './client';

export interface LoginInterface extends Body {
  email: string;
  secret: string;
}
