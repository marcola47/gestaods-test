import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({  
  cpf: {
    type: String,
    required: true,
    maxlength: 11,
  },

  rg: {
    type: String,
    required: true,
    maxlength: 9
  },

  name: {
    type: String,
    required: true,
    maxlength: 256
  },

  nickname: {
    type: String,
    maxlength: 256
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address.']
    // unique: true, --- já que não é um sistema de login, não é necessário ser único
  },

  birth: {
    type: Date,
    required: true
  },

  nationality: {
    type: String,
    maxlength: 64
  },

  gender: {
    type: String,
    enum: ["male", "female", "other", "not_declared"],
    required: true,
    default: "not_declared"
  },

  marital_status: {
    type: String,
    enum: ["single", "married", "divorced", "widower"],
  },

  observations: {
    type: String,
    maxlength: 1024
  },

  address: {
    ibge: {
      type: String,
      maxlength: 7
    },

    cep: {
      type: String,
      maxlength: 8
    },

    uf: {
      type: String,
      maxlength: 2
    },

    city: {
      type: String,
      maxlength: 128
    },

    neighborhood: {
      type: String,
      maxlength: 128
    },

    street: {
      type: String,
      maxlength: 128
    },

    number: {
      type: Number,
      maxlength: 6
    },

    complement: {
      type: String,
      maxlength: 128
    }
  }
})

PatientSchema.index({ cpf: 1 }, { unique: true });
export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);