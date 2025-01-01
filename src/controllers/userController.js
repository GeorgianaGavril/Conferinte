const { User } = require('../models');
const { checkUserExists, validateUserFields } = require('../utils/validation');

const createUser = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    const validation = validateUserFields({ name, email, password, confirmPassword, role });
    if (!validation.valid) {
        return res.status(400).json({ message: validation.message });
    }

    try {
        const userExists = await checkUserExists(email);
        if (userExists) {
            return res.status(400).json({ message: "A user with this email already exists" });
        }

        const newUser = await User.create({ name, email, password, role });
        return res.status(201).json({ message: 'User created successfully', newUser });
    } catch (e) {
        return res.status(500).json({ message: 'Error in creating user', error: e.message });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Cannot find user' });
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
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update(toUpdate);
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (e) {
        return res.status(500).json({ message: 'Error in updating user', error: e.message });
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
