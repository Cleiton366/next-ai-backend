import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

declare global {
  namespace Express {
    interface User {
      id: string,
      email: string,
      displayName: string,
      picture: string
    }
  }
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async authenticateWithGoogle(req: Request) {
    if (req.user) {
      const user = await this.usersService.getUserById(req.user.id);
      if (!user) {
        const newUser = await this.usersService.createUser({
          id: req.user.id,
          email: req.user.email,
          name: req.user.displayName,
          profilePicture: req.user.picture,
          preferences: {}
        });
        return newUser;
      }

      return user;
    } else throw new Error('Could not authenticate user.');
  }
}
