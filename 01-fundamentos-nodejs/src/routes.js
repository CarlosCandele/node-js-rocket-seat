import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutPath } from './util/build-route-path.js'


const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutPath('/users'),
        handler: (req, res) => {
            const { search } = req.query

            const users = database.select('users', search ? {
                name: search,
                email: search,
            } : null)

            return res.end(JSON.stringify(users)) 
        }
    },
    {
        method: 'POST',
        path: buildRoutPath('/users'),
        handler: (req, res) => {
           const { name, email} = req.body

            const user = {
                id: randomUUID(),
                name,
                email,
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutPath('/userd/:id'),
    handler: (req, res) => {
        const { id } = req.params
        const { name, email } = req.params 

        database.update('users', id, {
            name,
            email
        })

        return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutPath('/userd/:id'),
    handler: (req, res) => {
        
        const { id } = req.params

        database.delete('users', id)

        return res.writeHead(204).end()
    }
  }
]