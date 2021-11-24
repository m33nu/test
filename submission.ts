import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Institution } from "./institution";
import { Subject } from "./subject"

@Entity()
export class Submission extends BaseEntity
{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Institution, (inst) => inst.id, { onDelete: "CASCADE" })
    institution: Institution;
    
    @Column({ nullable: true })
    year: number;

    @Column({ nullable: true })
    studentTotal: number;
    
    @Column({ nullable: true })
    underGraduatesTotal: number;

    @Column({ nullable: true })
    postGraduatesTotal: number;

    @Column({ nullable: true })
    staffTotal: number;
    
    @Column({ nullable: true })
    academicPapers: number;

    @Column({ nullable: true })
    institutionIncome: number;

    @OneToMany(() => Subject, (sub) => sub.submission)
    subjects: Subject[];
}