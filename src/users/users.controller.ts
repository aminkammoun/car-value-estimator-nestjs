import { Controller, Post, Body, Param, Get, Patch, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/update.user.dto';
import { UserInterDto } from './dto/user.inter.dto';
import { UsersService } from './users.service'
import { Serialize } from '../interceptors/serialize.interceptor'
import { AuthService } from './Auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity'
import { AuthGuard } from 'src/guards/auth.guards';
@Controller('users')

export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }
    @Post('/auth/signup')
    async createUser(@Body() body: UserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.id = user.id
        return user
    }
    @Post('/auth/login')
    async loginUser(@Body() body: UserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.id = user.id
        return user
    }

    @Get('/auth/current')
    @UseGuards(AuthGuard)
    async getCurrentUser(@CurrentUser() user: User) {
        return user
    }

    @Post('/auth/signout')
    async signoutUser(@Session() session: any) {
        session.id = null
    }
    @Post('/delete/:id')
    deleteUser(@Param('id') id: number) {
        console.log(id);
        this.userService.delete(id)
    }

    @Post('/remove/:id')
    removeUser(@Param('id') id: number) {
        this.userService.removeUser(id)
    }

    @Serialize(UserInterDto)
    @Get(':id')
    async findUser(@Param('id') id: number) {
        console.log("im running ");
        const user = await this.userService.find(id)
        if (!user) {
            throw new NotFoundException("no user found")
        }
        return user
    }
    @Serialize(UserInterDto)
    @Get()
    findAllUser() {
        const user = this.userService.findAllUser()
        return user
    }
    @Get('/email/:email')
    findUserEmail(@Param('email') email: string) {
        const user = this.userService.findEmail(email)
        return user
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() userupdate: UserUpdateDto) {
        return this.userService.updateUser(id, userupdate)
    }

}
