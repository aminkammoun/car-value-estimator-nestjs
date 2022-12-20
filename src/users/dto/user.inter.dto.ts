import { Expose } from "class-transformer";

export class UserInterDto{
    @Expose()
    id: number;
    @Expose()
    email: string; 
     @Expose()
     admin: boolean;
}