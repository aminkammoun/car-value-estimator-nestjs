import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassCaller {
    new(...args: any[]): {}
}
export function Serialize(dto: ClassCaller) {
    return UseInterceptors(new SerializerInterceptor(dto))
}
export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        console.log("Im running before the handler ", context);
        return next.handle().pipe(
            map((data: any) => {
                /* console.log('Im running after the handler ' , data); */
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                });
            })
        )
    }
}