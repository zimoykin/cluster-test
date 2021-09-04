import { Response } from 'express'
import * as fs from 'fs'
import { create, CreateOptions } from 'html-pdf'
import { Mail } from './aws-mail'

export class PDF {
    options: CreateOptions = {
        format: 'A3',
        type: 'pdf'
    }
    static createDoc(
        res: Response, 
        data: { [key: string]: any }, 
        images: { [key: string]: string }
    ) {
        const pdf = new PDF()
        let html = fs.readFileSync(__dirname + '/templates/template.html', 'utf-8')
        console.log(data)
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
                            newValue = newValue + `${val}`
                        });
                    } else {
                        for (let subKey in data[key]) {
                            newValue = newValue + `${subKey}: ${data[key][subKey]}<br>`
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
            res.setHeader('Content-type', 'application/pdf')
            buf.pipe(res)
            buf.on('data', (chunk) => {
                bufs.push(chunk)   
            })
            buf.on('end', () => {
                const mail = new Mail()
                console.log(Buffer.concat(bufs))
                mail.send(Buffer.concat(bufs), 'zimoykin+pdf@gmail.com')
            })
        })
    }
}