import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";
@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    price: number;
    @Column()
    make: string;
    @Column()
    model: string;
    @Column()
    year: number;
    @Column()
    lng: number;
    @Column()
    lat: number;

    @Column()
    mileage: number;

    @ManyToOne(() => User, (user) => user.reports)
    users: User[]


}