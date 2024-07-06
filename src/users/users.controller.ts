import { Controller, Get, Param, Delete, UseGuards, Req, Res, Logger, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }
  private readonly logger = new Logger(UsersController.name);

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('oauth2/redirect/google')
  @UseGuards(AuthGuard('google'))
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const user = await this.authService.authenticateWithGoogle(req);
      res.status(302).redirect(`${process.env.FRONTEND_URL}/auth-success?user=${encodeURIComponent(JSON.stringify(user))}`);
    } catch (error) {
      return res.status(302).redirect(`${process.env.FRONTEND_URL}/auth-success?error=${error.message}`);
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.getUserById(id);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User not found') throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, { cause: new Error()});
    }
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async remove(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      this.logger.error(error);
      if (error.message === 'User not found') throw new HttpException(error.message, 404);
      throw new HttpException('Internal server error', 500, { cause: new Error()});
    }
  }
}
