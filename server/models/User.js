import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  educationalInstitution: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number'],
  },  
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  interestedTopics: [{
    type: String,
  }],
  currentCity: {
    type: String,
  },
  profile: {
      type: String,
  },
  ratings: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
        max: 5,
      },
  }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
