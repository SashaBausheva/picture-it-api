const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  artistUsername: {
    type: String,
    required: true
  },
  profileUrl: {
    type: String,
    required: true
  },
  artistSpecialty: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
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

module.exports = mongoose.model('Review', reviewSchema)
