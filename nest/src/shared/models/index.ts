import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';

import { User } from '../../users';

export interface AppRequest extends Request {
  status: HttpStatus;
  user?: User;
}
