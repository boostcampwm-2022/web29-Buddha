import { Controller, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원정보(닉네임) 수정
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }
}
