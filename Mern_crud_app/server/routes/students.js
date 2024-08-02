const express = require('express');
const router=express.Router();

const Candidatemodel= require('../controllers/students_control');

router.get('/viewUsers',Candidatemodel.index)

router.post('/addusers',Candidatemodel.detailspost)

router.get('/updateuser/:registration_number',Candidatemodel.detailsupdateget)

router.post('/updateusers',Candidatemodel.detailsupdate)

// router.get('/deleteusers/:registration_number',Candidatemodel.detailsdeleteget)

router.delete('/deleteUser/:registration_number',Candidatemodel.detailsdelete)

module.exports=router;