import { User } from './user'

export class Document {
    id: number;
    name: string;
    s3Path: string;
    bucket: string;
    extension: string;
    user: User;
    type: string;
  }
  