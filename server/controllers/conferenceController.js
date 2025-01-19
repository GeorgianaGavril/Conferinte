const {validateConference, validateUpdateConference} = require("../utils/validation")
const {Conference, User} = require("../models")

const createConference = async (req, res) => {
    try {
        const {name, description, date, location, idOrganizer} = req.body;
     
        const validation = validateConference({name, date, description,  location, idOrganizer});
  
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        const organizer = await User.findByPk(idOrganizer);
        if (!organizer) {
            return res.status(404).json({ message: 'Organizatorul nu a fost gasit' });
        }

        const utcDate = new Date(date + "UTC");
        const isoDate = utcDate.toISOString(); 
        const newConference = await Conference.create({name,description,date:isoDate, location, idOrganizer});
        return res.status(201).json({ message: 'Conferinta creata cu succes', newConference });
            
    } catch (e) {
        return res.status(500).json({ message: 'Eroare la crearea conferintei', error: e.message });
    }
};

const getConferenceById = async (req, res) => {
    const id = req.params.id;

    try {
        const conference = await Conference.findByPk(id);
        if (!conference) {
            return res.status(404).json({ message: 'Conferinta nu a fost gasita' });
        }
        return res.status(200).json(conference);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getAllConferences = async (req, res) => {
    try {
        const conferences = await Conference.findAll();
        if (!conferences) {
          return res.status(404).json({ message: "Nu au fost gasite conferintele" });
        }
        return res.status(200).json(conferences);
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
}

const updateConference = async (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;

    try {
        const conference = await Conference.findByPk(id);

        if (!conference) {
            return res.status(404).json({ message: 'Conferinta nu a fost gasit' });
        }

        const validation = validateUpdateConference(toUpdate);
        if (!validation.valid) {
            return res.status(400).json({ message: validation.message });
        }

        if(toUpdate.date){
            const date = new Date(toUpdate.date + ' UTC'); 
            toUpdate.date = date.toISOString(); 
        }
        await conference.update(toUpdate);
        return res.status(200).json({ message: 'Conferinta actualizata cu succes', conference });
    } catch (e) {
        return res.status(500).json({ message: 'Eroare la actualizarea conferintei', error: e.message });
    }
};

const deleteConference = async (req, res) => {
    const id = req.params.id;

    try {
        const conference = await Conference.findByPk(id);
        await conference.destroy();
        return res.status(200).json({ message: 'Conferinta stearsa cu succes' });
    } catch (e) {
        return res.status(500).json({ message: 'Eroare la stergerea conferintei', error: e.message });
    }
};

module.exports = {
    createConference, 
    getConferenceById, 
    getAllConferences, 
    updateConference, 
    deleteConference 
}