import { Expose, Transform } from "class-transformer";
import { User } from 'src/users/entities/user.entity'
export class ReportsInterDto {
    @Expose()
    price: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    year: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    mileage: number;
    @Transform(({ obj }) => obj.users.id)
    @Expose()
    userId: number;
}