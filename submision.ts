import { Submission } from "../models/submission";
import { Subject } from "../models/subject"
import { Institution } from "../models/institution";

/**
 *  Creates a submission for an already added institution
 */
export const create = async (req, res) => {
    const { id, institution_id, year, students_total,
        undergraduates_total, postgraduates_total, staff_total,
        academic_papers, institution_income, subjects } = req.body;
    const inst = await Institution.findOne({ id: institution_id })
    if (!inst) {
        res.status(404).json({
            code: "INSTITUTION_NOT_FOUND",
            message: "Institution not found!",
        });
        return;
    }
    let  submission = Submission.create({ id, institution: {id: institution_id}, year, studentTotal: students_total,
        underGraduatesTotal: undergraduates_total, postGraduatesTotal: postgraduates_total, staffTotal: staff_total,
        academicPapers: academic_papers, institutionIncome: institution_income })
    await submission.save()
    for (let subject of subjects) {
        const sub = Subject.create({
            submission, name: subject.name,
            studentTotal: subject.students_total,
            academicPapers: subject.academic_papers,
            studentRating: subject.student_rating
        })
        await sub.save()
    }
    res.status(200).send(true);
};

/**
 *  Reads a submission
 */
export const read = async (req, res) => {
    const { id } = req.query;
    const submission = await Submission.findOne({ where: { id }, relations: ["institution", "subjects"] })
    if (!submission) {
        res.status(404).json({
            code: "SUBMISSION_NOT_FOUND",
            message: "Submission not found!",
        });
        return;
    }
    res.json(submission);
};

/**
 *  Lists all the submissions. If the institution id is specififed, it list all the submissions within an institution.
 */
export const list = async (req, res) => {
    const { institution_id } = req.query
    let submissions = []
    if (!institution_id) {
        submissions = await Submission.find({ relations: ["institution", "subjects"] })
    }
    else {
        submissions = await Submission.find({
            where: {
                institution: { id: institution_id }
            },
            relations: ["institution", "subjects"]
        })
    }
    
    res.json(submissions);
};

