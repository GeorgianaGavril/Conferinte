const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilizatorul nu a fost gasit' });
        }
        console.log("userul este " +user)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: 'Datele de autentificare nu sunt corecte' });
        }

        const token = jwt.sign(
            { userId: user.idUser, role: user.role, username: user.firstname },
            process.env.JWT_SECRET_KEY,  
            { expiresIn: '3h' } 
        );
        return res.status(200).json({ message: 'Autentificare reusita', token });
    } catch (e) {
  
        return res.status(500).json({ message: e.message });
    }
};


module.exports = { loginUser };