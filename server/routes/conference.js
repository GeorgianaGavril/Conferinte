const express = require("express")
const router = express.Router()
const { 
    createConference, 
    getConferenceById, 
    getAllConferences, 
    updateConference, 
    deleteConference,
    getArticleForConference 
} = require('../controllers/conferenceController');

// Am creat endpoint-uri CRUD (create, read, update, delete) 

router.get("/:id/article", getArticleForConference);

router.get("/:id", getConferenceById)

router.get("/", getAllConferences);

router.post('/', createConference)

router.patch("/:id", updateConference)

router.delete("/:id", deleteConference)

module.exports = router