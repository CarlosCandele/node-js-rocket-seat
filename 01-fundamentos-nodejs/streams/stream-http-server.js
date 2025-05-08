import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformd = Number(chunk.toString()) * (-1)

        console.log(transformd)

        callback(null,Buffer.from(String(transformd)))
    }
  }

const server = http.createServer(async(req, res) => {
    const buffers = []

    for await(const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreanmContent = Buffer.concat(buffers).toString()

        console.log(fullStreanmContent)

        return res.end(fullStreanmContent)

})

server.listen(3334)

