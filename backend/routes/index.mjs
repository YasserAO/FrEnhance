import express from "express";
const router = express.Router();

// Auth
import register from "./Authentication/register.mjs";
import authenticate from "./Authentication/authenticate.mjs";
import userStatus from "./Authentication/userStatus.mjs";

router.use(register);
router.use(userStatus);
router.use(authenticate);

// Gen
import GenText from "./Gen/GenText.mjs";
import GenQuestion from "./Gen/GenQuestion.mjs";
import GenCorrection from "./Gen/GenCorrection.mjs";

router.use(GenText);
router.use(GenQuestion);
router.use(GenCorrection);

// Downloads
import EditGetText from "./download/EditTextGet.mjs";
import LoadText from "./download/getText.mjs";

router.use(LoadText);
router.use(EditGetText);

// Uploads
import SaveText from "./upload/SaveText.mjs";
import DeleteText from "./upload/DeleteText.mjs";
import EditSaveText from "./upload/EditTextSave.mjs";

router.use(SaveText);
router.use(DeleteText);
router.use(EditSaveText);

export default router;
