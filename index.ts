import { Router } from "express";
import { institutionController, subjectController, submissionController } from "../controllers"

let router = Router();

/* GET home page. */
router.get("/", async (req, res) => {
  res.json("Welcome to Test Project");
});

router.post("/institution", institutionController.create);

router.get("/institution", institutionController.read);

router.get("/institutions", institutionController.list);

router.put("/institution", institutionController.update);

router.post("/submission", submissionController.create);

router.get("/submission", submissionController.read);

router.get("/submissions", submissionController.list);

router.get("/subjects", subjectController.list);

export default router;
