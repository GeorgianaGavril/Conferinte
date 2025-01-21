const { User } = require('../models');
const { checkUserExists, validateUserFields } = require('../utils/validation');

// Functia creaza un user pe baza informatiilor primite in cerere
// Daca nu sunt trimise informatiile necesare se returneaza codul http 500 si un mesaj de eroare
// Verificam daca exista un user cu acelasi mail deoarece emailul este unic
// Verificam daca utilizatorul a introdus parolele corect
const createUser = async (req, res) => {
    const { name, firstName, email, password, confirmPassword, role } = req.body;

    // validam informatiile pentru a ne asigura ca ce este introdus in baza de date este corect
    const validation = validateUserFields({name, firstName, email, password, confirmPassword, role });
    console.log(validation.valid);  
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        const userExists = await checkUserExists(email);
        console.log("exista user " + userExists)
        if (userExists !== null) {
            return res.status(400).json({ message: "Exista deja un utilizator cu acest email" });
        }

        const newUser = await User.create({firstname: firstName,lastname: name, email, password, role });
        return res.status(201).json({ message: 'Utilizator creat cu succes', newUser });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({  error: e.message });
    }
};

// Returneaza utilizatorul pe baza id-ului daca acesta exista
const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost gasit' });
        }
        return res.json(user);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// Returneaza toti utilizatorii
const getAllUsers = async(req, res) =>{
    const { role } = req.query;
    let users;
    if(role){
        try {
            users = await User.findAll({
                where: { role },
              });
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ message: "Server error" });
          }
    } else {
        try {
            users = await User.findAll();
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ message: "Server error" });
          }
    }
}

// Actualizeaza anumite sau toate campurile utilizatorului in functie de cate informatii sunt 
// trimise in cerere
const updateUser = async (req, res) => {
    const id = req.params.id;
    const toUpdate = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost gasit' });
        }

        await user.update(toUpdate);
        return res.status(200).json({ message: 'Utilizator actualizat cu succes', user });
    } catch (e) {
        return res.status(500).json({ message: 'Eroare la actualizarea utilizatorului', error: e.message });
    }
};

// Stergem utilizatorul pe baza id-ului daca acesta exista
const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        return res.status(500).json({ message: 'Error in deleting user', error: e.message });
    }
};

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser };