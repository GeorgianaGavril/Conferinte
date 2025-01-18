const { User } = require('../models');
const { checkUserExists, validateUserFields } = require('../utils/validation');

const createUser = async (req, res) => {
    const { name, firstName, email, password, confirmPassword, role } = req.body;

    const validation = validateUserFields({name, firstName, email, password, confirmPassword, role });
    console.log(validation);  
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        const userExists = await checkUserExists(email);
        console.log(userExists)
        if (userExists !== null) {
            return res.status(400).json({ message: "Exista deja un utilizator cu acest email" });
        }

        const newUser = await User.create({firstname: firstName,lastname: name, email, password, role });
        return res.status(201).json({ message: 'Utilizator creat cu succes', newUser });
    } catch (e) {
        return res.status(500).json({ message: 'Eroare la crearea utilizatorului', error: e.message });
    }
};

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

module.exports = { createUser, getUserById, updateUser, deleteUser };
