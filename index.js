const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 5000;


app.post('/', async(req, res) => {
    // console.log("tesitng");
    // return false;
    // const {email} = req.body;
    // const {email} = "receiver@email.com"
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cody.mohr29@ethereal.email',
            pass: 'YQdjTgEuKV8BmNJBNJ'
        },
    });

    const message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>test message?</b>", // html body
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddx

    res.json({
        'message':'message sent',
        'status':200
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});