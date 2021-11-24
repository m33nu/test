import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Institution extends BaseEntity
{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ nullable: true })
    name: string;
    
    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    country: string;
    
    @Column({ nullable: true })
    region: string;
}