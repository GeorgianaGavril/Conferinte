const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Acesta functie se ocupă cu procesul de autentificare a utilizatorilor.
// Verifică dacă utilizatorul există în baza de date și dacă parola introdusă este corectă.
// Dacă autentificarea este reușită, aceasta generează un token JWT și îl returnează.
// Dacă există erori, acestea sunt gestionate și sunt returnate mesaje de eroare.
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