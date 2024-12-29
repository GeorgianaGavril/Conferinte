const express = require('express');
const cors = require('cors');
const { User } = require('./models');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-user', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    console.log('Datele primite pentru crearea utilizatorului:', req.body);
    
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
});

app.listen(3000, () => {
  console.log('Serverul rulează pe portul 3000');
});
