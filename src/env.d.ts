
interface UserPayload {
  id: number;
  username: string;
}

declare namespace App {
  interface Locals {
    user: UserPayload;
  }
}
