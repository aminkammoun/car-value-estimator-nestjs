import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Reports } from "src/reports/entities/reports.entity";
@Entity()
export class User {
    /* @ObjectIdColumn()
    _id: Object; */
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Reports, (report) => report.users)
    reports: Reports[];

    @AfterInsert()
    logInsert() {
        console.log("Inserted user with id: " + this.id);
        return "Inserted user with id: " + this.id

    }
    @AfterRemove()
    logRemove() {
        console.log("Removed user with id: " + this.id);
        return "Removed user with id: " + this.id
    }
    @AfterUpdate()
    logUpdate() {
        console.log("Updated user with id: " + this.id);
        return "Updated user with id: " + this.id
    }

}