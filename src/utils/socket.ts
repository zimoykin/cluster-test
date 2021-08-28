import * as dgram from 'dgram'
import { v4 } from 'uuid'

export class SocketServer {
    server: any 
    clients = new Set<({ id: string, address: string, port: number })>() 
    constructor(
        port: number
        ){
        const server = dgram.createSocket('udp4')
        server.bind({
            port: port,
            exclusive: true,
            address: '0.0.0.0'
        })
        server.on('message', (buf, info) => {
            console.log(buf)
            const payload = JSON.parse(buf.toString('utf-8'))
            switch(payload.type) {
                case 'new': { 
                    const id = v4()
                    server.send(
                    JSON.stringify({ type: 'new', client: id }),
                    info.port, 
                    info.address, 
                    (err, bytes) => {
                        this.clients.add({ id: id, address: info.address, port: info.port })
                        console.log(err, bytes)
                })
            }
                case 'message': console.log(payload.message)
                case 'logout': console.log(payload.message)
            }
        })
    }
    static instance (on: number) {
        return new SocketServer(on)
    }

}