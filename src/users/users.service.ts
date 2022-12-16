import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user)
    }
    delete(id: number) {
        return this.repo.delete(id)
    }
    find(id: number) {
        if (!id) {
            console.log("no ID")
            return null
        }
        return this.repo.findOneBy({ id: id })
    }
    findEmail(email: string) {
        return this.repo.findBy({ email: email })
    }
    findAllUser() {
        return this.repo.find()
    }
    async updateUser(id: number, attrs: Partial<User>) {
        let user = await this.find(id);
        if (!user) {
            throw new NotFoundException("no useer to update");
        }
        user = Object.assign(user, attrs);
        return this.repo.save(user)
    }
    async removeUser(id: number) {
        const user = await this.find(id);

        if (!user) {
            throw new NotFoundException("no useer to remove");
        }

        return this.repo.remove(user)
    }
}
