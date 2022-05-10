const express = require('express');
const router = express.Router()
const complaint = require('../models/complaint')

router.get('/', async (req, res) =>{
    try {
        const complaints = await complaint.find()
        res.json(complaints)
    }catch (err){
        res.status(500).json({message: err.message})
    }   
})

router.post('/', (req, res) =>{
    const createComplaint = new complaint({
        complain: req.body.complain,
        complain_description:req.body.complain_description
    })

    try {
        const newComplaint = createComplaint.save()
        res.status(201).json({message: "Complaint Saved Successfully"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

router.get('/:id', async (req, res) =>{
    try{
        complaint_resp = await complaint.findById(req.params.id)
        if(complaint_resp == null){
            return res.status(404).json({message: " Sorry, Complaint Not Found"})
        }else{
            res.json(complaint_resp)
        }
    }catch(err){
        return res.status(500).json({messag: err.message})
    }
    
})

router.patch('/:id', async (req, res) =>{
    complaint_update = await complaint.findById(req.params.id)
        if(complaint_update == null){
            return res.status(404).json({message: "Complaint Not Found"})
        }else{
            if(req.body.complain != null){
                complaint_update.complain = req.body.complain
            }if(req.body.complain_description != null){
                complaint_update.complain_description = req.body.complain_description
            }if(req.body.status != null){
                complaint_update.status = req.body.status
            }
        }
    try{
        const newComplaint = complaint_update.save()
        res.status(201).json({message: "Complaint Updated Successfully"})
    }catch(err){
        return res.status(500).json({messag: err.message})
    }
    
})


module.exports = router;