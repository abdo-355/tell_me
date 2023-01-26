// to save the userId in the request object
declare namespace Express {
  interface Request {
    userId: string;
  }
}
