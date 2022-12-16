import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { log } from 'console';

const scrypt = promisify(_script)
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }
    async hashFunc(password: string) {
        //Genarate a salt 
        const salt = randomBytes(8).toString('hex')

        // Hash the salt and the password 
        const hash = (await scrypt(password, salt, 32)) as Buffer
        return salt + '.' + hash.toString('hex')
    }
    async signup(email: string, password: string) {
        const user = await this.usersService.findEmail(email)
        if (user.length) {
            throw new BadRequestException("email is already in use")
        }
        // Join the hash result + the salt 
        const result = await this.hashFunc(password)
        console.log("Hash result " + result);

        const userCreated = this.usersService.create(email, result)
        return userCreated

    }

    async signin(email: string, password: string) {
        const user = await this.usersService.findEmail(email)
        if (user.length === 0) {
            throw new BadRequestException("no user found")
        }
        const [salt, storeHash] = await user[0].password.split('.')
        const hash = ((await scrypt(password, salt, 32)) as Buffer).toString('hex')
        if (storeHash != hash) {
            throw new BadRequestException("password mismatch")
        } else {
            return user[0]
        }


    }

}