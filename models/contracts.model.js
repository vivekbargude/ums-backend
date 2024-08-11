const mongoose = require('mongoose');
const { Schema } = mongoose;

const partySchema = new Schema({
  partyName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  contactInformation: {
    phoneNumber: String,
    emailAddress: String,
    mailingAddress: String,
  },
  role: {
    type: String,
    required: true,
  },
  signatoryAuthority: {
    name: String,
    title: String,
  },
});

const contractSchema = new Schema({
  siteName: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    enum: ['Government', 'Private'],
    required: true,
  },
  contractID: {
    type: String,
    unique: true,
    sparse: true, // Unique, but optional for non-private contracts
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Done'],
    required: true,
  },
  effectiveDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
  },
  contractTerm: {
    type: String,
    required: true,
  },
  renewalTerms: {
    type: String,
  },
  partiesInvolved: {
    type: [partySchema],
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