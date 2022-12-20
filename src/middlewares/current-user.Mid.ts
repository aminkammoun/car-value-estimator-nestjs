import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { UsersService } from "src/users/users.service";
import { User} from '../users/entities/user.entity'

declare global{
    namespace Express {
        interface Request{
            CurrentUser? : User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { id} = req.session

        if (id) {
            const user = await this.userService.find(id);
            req.CurrentUser = user;
        }
        next()
    }
}