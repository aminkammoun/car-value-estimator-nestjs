import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) { }
    async intercept(context: ExecutionContext, handler: CallHandler) {

        const request = context.switchToHttp().getRequest()
        const { id } = request.session

        if (id) {
            const user = await this.userService.find(id)
            request.CurrentUser = user
        }
        return handler.handle()
    }
}