import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn,ObjectIdColumn } from "typeorm";
import { Exclude } from "class-transformer";
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