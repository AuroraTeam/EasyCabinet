import { randomUUID } from 'crypto';

import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { HasJoinedDto } from './dto/hasJoined.dto';
import { JoinDto } from './dto/join.dto';
import { ProfileDto } from './dto/profile.dto';
import { ProfilesDto } from './dto/profiles.dto';

@Injectable()
export class AuroraService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  public async auth(login: string, password: string) {
    const user = await this.authService.verifyAuth(login, password);

    const accessToken = randomUUID();
    await this.usersService.updateUser({ uuid: user.uuid }, { accessToken });

    return {
      username: user.login,
      userUUID: user.uuid,
      accessToken,
      ...this.usersService.getSkinData(user),
    };
  }

  public async join(body: JoinDto) {
    const user = await this.usersService.findUser({
      uuid: body.userUUID,
      accessToken: body.accessToken,
    });

    if (!user) return false;

    await this.usersService.updateUser(
      { uuid: body.userUUID },
      { serverId: body.serverID },
    );
    return true;
  }

  public async hasJoined(body: HasJoinedDto) {
    const user = await this.usersService.findUser({
      login: body.username,
      serverId: body.serverID,
    });

    return {
      userUUID: user.uuid,
      ...this.usersService.getSkinData(user),
    };
  }

  public async profile(body: ProfileDto) {
    const user = await this.usersService.findUser({
      uuid: body.userUUID,
    });

    return {
      username: user.login,
      ...this.usersService.getSkinData(user),
    };
  }

  public async profiles(body: ProfilesDto) {
    const users = await this.usersService.findUsers({
      login: In(body.usernames),
    });

    return users.map((user) => ({
      id: user.uuid,
      name: user.login,
    }));
  }
}
