const path = require('path');
const compress = require('compression');
const express = require('express');
const cors = require('cors');

const apiKey = 'key-1a62b4a4982b7185d90632a29ca3b9d2';
const domain = 'mg.etage.com.ua';

const mailgun = require('mailgun-js')({ domain, apiKey });

const app = express();

const port = process.env.PORT || 8020;

const publicPath = path.join(__dirname, '..', 'dist');

app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.static(publicPath));

app.post('/api/callback', async (req, res) => {
    const { name, phone } = req.body;

    try {
        await mailgun.messages().send({
            from: `${name} <mailgun@${domain}>`,
            to: 'etage.pereezd@gmail.com',
            subject: 'Перезвоните мне, пожалуйста',
            html: `
                <h4>Перезвоните мне, пожалуйста</h4>
                <strong>Имя: </strong> ${name} <br />
                <strong>Телефон: </strong> ${phone}
            `,
        });
    } catch (e) {
        console.log(e);
    }

    res.send('OK');
});

app.post('/api/feedback', async (req, res) => {
    const { name, phone, from, comment } = req.body;

    try {
        await mailgun.messages().send({
            from: `${name} <mailgun@${domain}>`,
            to: 'iodessa557@gmail.com',
            subject: 'Отзыв',
            html: `
                <h4>Отзыв</h4>
                <strong>Имя: </strong> ${name} <br />
                <strong>Телефон: </strong> ${phone}
                <strong>Откуда: </strong> ${from} <br />
                <strong>Отзыв: </strong><br>
                <p>${comment}</p>
            `,
        });
    } catch (e) {
        console.log(e);
    }

    res.send('OK');
});

app.post('/api/order', async (req, res) => {
    const { name, phone, from, to, workers, type, date, comment } = req.body;

    try {
        await mailgun.messages().send({
            from: `${name} <mailgun@${domain}>`,
            to: 'etage.pereezd@gmail.com',
            subject: 'Заяка',
            html: `
                <h4> Заявка</h4>
                <strong>Имя: </strong> ${name} <br />
                <strong>Телефон: </strong> ${phone}
                <strong>Откуда: </strong> ${from} <br />
                <strong>Куда: </strong> ${to} <br />
                <strong>Планируемая дата: </strong> ${date}
                <strong>Тип транспортировки: </strong> ${type} <br />
                <strong>Количество грузчиков: </strong> ${workers} <br />
                <strong>Комментарий: </strong><br>
                <p>${comment}</p>
            `,
        });
    } catch (e) {
        console.log(e);
    }

    res.send('OK');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});