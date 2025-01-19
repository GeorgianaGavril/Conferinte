const express = require("express")
const router = express.Router()
const { 
    createConference, 
    getConferenceById, 
    getAllConferences, 
    updateConference, 
    deleteConference 
} = require('../controllers/conferenceController');


router.get("/", getAllConferences);

router.get("/:id", getConferenceById)

router.post('/', createConference)

router.patch("/:id", updateConference)

router.delete("/:id", deleteConference)

module.exports = router