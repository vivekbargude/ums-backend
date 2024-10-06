const mongoose = require('mongoose');
const { Schema } = mongoose;

const partySchema = new Schema({
  partyName: {
    type: String,
    required: true,
  },
  partyContact: {
    type: String,
    required: true,
  },
  
  // contactPerson: {
  //   type: String,
  //   required: true,
  // },
  // contactInformation: {
  //   phoneNumber: String,
  //   emailAddress: String || null,
  //   // mailingAddress: String,
  // },
  // role: {
  //   type: String,
  //   required: true,
  // },
  // signatoryAuthority: {
  //   name: String,
  //   title: String,
  // },
});

const contractSchema = new Schema({
  contractType: {
    type: String,
    enum: ['Government', 'Private'],
    required: true,
  },
  contractName: {
    type: String,
    required: true,
  },
  duration: { type: String, required: true },
  details: {
    type: String,
    required: true
  },
  additionalTerms:{
    type: String,
  },
  // contractID: {
  //   type: String,
  //   unique: true,
  //   sparse: true, // Unique, but optional for non-private contracts
  // },
  effectiveDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Completed'],
    required: true,
  },
  // contractTerm: {
  //   type: String,
  //   required: true,
  // },
  // renewalTerms: {
  //   type: String,
  // },
  partyDetails: {
    type: partySchema,
    validate: {
      validator: function (v) {
        // If contractType is 'Private', partiesInvolved must be non-empty
        if (this.contractType === 'Private' && (!v || v.length === 0)) {
          return false;
        }
        // If contractType is 'Government', partiesInvolved should be empty or undefined
        if (this.contractType === 'Government' && v && v.length > 0) {
          return false;
        }
        return true;
      },
      message: function (props) {
        if (this.contractType === 'Private') {
          return 'Private contracts must include at least one party involved.';
        } else {
          return 'Government contracts should not include parties involved.';
        }
      },
    },
  },
}, {
  timestamps: true,
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;