const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'brightnickson63@gmail.com',
        pass: 'mytsedbubafbzthq' // Use an App Password, not your Gmail password
    }
});

// Endpoint to send newsletter
app.post('/send-newsletter', async (req, res) => {
    const { subject, content, recipients } = req.body;
    if (!subject || !content || !recipients || !Array.isArray(recipients)) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        await transporter.sendMail({
            from: '"Callistus" <brightnickson63@gmail.com>',
            to: recipients.join(','),
            subject,
            text: content
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send email', details: err.message });
    }
});

app.listen(3001, () => {
    console.log('Newsletter backend running on http://localhost:3001');
});