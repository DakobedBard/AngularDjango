import { User } from './user'

export class Document {
    id: number;
    name: string;
    uploadfile: string;
    bucket: string;
    extension: string;
    user: User;
    type: string;
  }
  