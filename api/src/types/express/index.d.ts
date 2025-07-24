export {};

declare global {
  namespace Express {
    export interface Request {
      rawBody?: Buffer;
      userId?: Number;
      cleanBody?: any;
      role: string;
    }
  }
}
