const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  altDescription: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ImageEntry', imageSchema)
