const express = require("express")
const router = express.Router()
const { User } = require('../models');

router.get("/new", (req, res) =>{

})

router.get("/:id",async (req, res) =>{
    const id = req.params.id;
    let user = "";
    try{
        user = await User.findByPk(id)
        if(user == null){
            return res.status(404).json({message: 'Cannnot find user'})
        }
    } catch(e){
        return res.status(500).json({message: e.message})
    }
    res.json(user)

})

router.post('/', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Toate câmpurile sunt necesare.' });
      } 
  
      const newUser = await User.create({ name, email, password, role });
      console.log('Utilizatorul a fost creat:', newUser.toJSON());
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Eroare la crearea utilizatorului:', error);
      res.status(500).json({ message: 'Eroare la crearea utilizatorului', error: error.message });
    }
  })

router.put("/:id", (req, res) =>{

})

router.delete("/:id", (req, res) =>{

})

module.exports = router