const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET_KEY,  
            { expiresIn: '1h' } 
        );

        return res.status(200).json({ message: 'Login successful', token });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
