import * as AWS from 'aws-sdk'
import * as nodemailer from 'nodemailer'

export class Mail {
    mail: AWS.SES
    constructor() {
        this.mail = new AWS.SES({
            region: process.env.REGION,
            accessKeyId: process.env.AWSAccessKeyId,
            secretAccessKey: process.env.AWSSecretKey  
        })
    }

    send(buf: Buffer, to: string) {
        const transporter = nodemailer.createTransport({
            SES: this.mail
          });
          transporter.sendMail({
                from: process.env.EMAILSENDER,
                to: to,
                subject: 'report',
                attachments: [{
                        filename: 'report.pdf', 
                        content: buf
                    }]
            })
            .then((val) => console.log(val))
            .catch(err=> console.log(err))
    }
}