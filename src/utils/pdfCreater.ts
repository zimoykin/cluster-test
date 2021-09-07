import { Response } from 'express'
import * as fs from 'fs'
import { create, CreateOptions } from 'html-pdf'
import { User } from '../model/user.entity'
import { Mail } from './aws-mail'

export class PDF {
    options: CreateOptions = {
        border: {
            bottom: '10mm',
            top: '10mm',
            left: '10mm', 
            right: '10mm'
        }
    }
    static createDoc(
        user: User,
        res: Response, 
        data: { [key: string]: any }, 
        images: { [key: string]: string }
    ) {
        const pdf = new PDF()
        let html = fs.readFileSync(__dirname + '/templates/template.html', 'utf-8')

        for (let key in data) {
            switch( typeof data[key]) {
                case 'string':{
                    html = html.replace(`{{${key}}}`, `${data[key]}`);
                    break;
                }
                case 'number':{
                    html = html.replace(`{{${key}}}`, `${data[key]}`);
                    break;
                }
                case 'object': {
                    let newValue = ''
                    if (Array.isArray(data[key])) {
                        data[key].forEach( val => {
                            newValue += `${val}`
                        });
                    } else {
                        for (let subKey in data[key]) {
                            newValue += `${subKey}: ${data[key][subKey]}<br>`
                        }
                        html = html.replace(`{{${key}}}`, `${newValue}`);
                    }
                    break;
                }
                case 'boolean':{
                    html = html.replace(`{{${key}}}`, `${data[key]}`);
                    break;
                }

            }
        } 
        for (let img in images) {
            console.log(`{{${img}}}`, `${images[img]}`)
            html = html.replace(`{{img}}`, images[img]);
        }
        var bufs = new Array<any>();
        create(html, pdf.options)
        .toStream((err, buf) => {
            if (err) {
                console.log(err)
                res.status(400).json({ error: err})
            } else {
                res.setHeader('Content-type', 'application/pdf')
                buf.pipe(res)
                buf.on('data', (chunk) => {
                    bufs.push(chunk)   
                })
                buf.on('end', () => {
                    const mail = new Mail()
                    mail.send(Buffer.concat(bufs), user.email)
                })
            }
        })
    }
}