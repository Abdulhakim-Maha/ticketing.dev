import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'asdfd',
      price: 20
    })
    .expect(404)
})

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'asdfd',
      price: 20
    })
    .expect(401)
})

it('returns a 401 if the user does not own the ticket', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdfds',
      price: 20
    })

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'dsdsfdfsf',
      price: 1000
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signin()

  const res = await request(app)
    .post('/api/tickets/')
    .set('Cookie', cookie)
    .send({
      title: 'asdfd',
      price: 20
    })

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })

    .expect(400)
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'dfssfdf',
      price: -10
    })
    .expect(400)

})

it('returns a 401 if the user does not own the ticket', async () => {

  const cookie = global.signin()

  const res = await request(app)
    .post('/api/tickets/')
    .set('Cookie', cookie)
    .send({
      title: 'asdfd',
      price: 20
    })

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
      price: 100
    })
    .expect(200)

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()

  expect(ticketRes.body.title).toEqual('new title')
  expect(ticketRes.body.price).toEqual(100)
})
