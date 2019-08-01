const axios = require('axios')
require('dotenv').config()
// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const ImageEntry = require('../models/image')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /examples
router.get('/images', requireToken, (req, res, next) => {
  ImageEntry.find()
    .then(images => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return images.map(image => image.toObject())
    })
    .then(images => {
      images.map(image => {
        if (JSON.stringify(req.user._id) === JSON.stringify(image.owner)) {
          image.editable = true
        } else {
          image.editable = false
        }
      })
      return images
    })
    // respond with status 200 and JSON of the examples
    .then(images => res.status(200).json({ images: images }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /examples/5a7db6c74d55bc51bdf39793
router.get('/images/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  ImageEntry.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(image => res.status(200).json({ image: image.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /examples
router.post('/images', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.image.owner = req.user.id

  ImageEntry.create(req.body.image)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(image => {
      const imageObject = image.toObject()
      imageObject.editable = true
      return imageObject
    })
    .then(imageObject => {
      res.status(201).json({ image: imageObject })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/images/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.image.owner

  ImageEntry.findById(req.params.id)
    .then(handle404)
    .then(image => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, image)

      // pass the result of Mongoose's `.update` to the next `.then`
      return image.update(req.body.image)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/images/:id', requireToken, (req, res, next) => {
  ImageEntry.findById(req.params.id)
    .then(handle404)
    .then(image => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, image)
      // delete the example ONLY IF the above didn't throw
      image.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// GET /examples
router.get('/random-images', (req, res, next) => {
  axios({
    url: `https://api.unsplash.com/photos/random?count=5&client_id=${process.env.CLIENT_ID}`,
    method: 'GET'
  })
    .then(imageObject => {
      res.status(201).send({ images: imageObject.data })
    })
    .catch(err => {
      res.send({ err })
    })
})

// GET /examples
router.get('/random-image', (req, res, next) => {
  console.log('router get is running')
  axios({
    url: `https://api.unsplash.com/photos/random?client_id=${process.env.CLIENT_ID}`,
    method: 'GET'
  })
    .then(imageObject => {
      console.log(imageObject)
      res.status(201).send({ image: imageObject.data })
    })
    .catch(err => {
      console.log('error in router')
      console.log(err)
      res.send({ err })
    })
})

// GET /examples
router.get('/find-images', (req, res, next) => {
  axios({
    url: `https://api.unsplash.com/search/photos?page=1&query=${req.query.query}&client_id=${process.env.CLIENT_ID}`,
    method: 'GET'
  })
    .then(imageObject => {
      res.status(201).send({ images: imageObject.data })
    })
    .catch(err => {
      res.send({ err })
    })
})

module.exports = router
