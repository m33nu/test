import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Submission } from "./submission";

@Entity()
export class Subject extends BaseEntity
{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Submission, (sub) => sub.id, { onDelete: "CASCADE" })
    submission: Submission;
    
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    studentTotal: number;
    
    @Column({ nullable: true })
    academicPapers: number;

    @Column({ nullable: true })
    studentRating: number;
}