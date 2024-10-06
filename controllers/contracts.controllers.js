const Contract = require('../models/contracts.model');

// Create a new contract
handleCreateNewContract = async (req, res) => {
  try {
    const { contractType, contractName, duration, details, additionalTerms, effectiveDate, endDate, status, partyDetails } = req.body;

    const newContract = new Contract({
      contractType,
      contractName,
      duration,
      details,
      additionalTerms,
      effectiveDate,
      endDate,
      status,
      partyDetails,
    });

    const savedContract = await newContract.save();
    res.status(201).json({ message: 'Contract created successfully', contract: savedContract });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contract', error });
  }
};

// Get all contracts
handleGetAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contracts', error });
  }
};

// Get a single contract by ID
handleGetContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contract', error });
  }
};

// Update a contract by ID
handleUpdateContractById = async (req, res) => {
  try {
    const { contractType, contractName, duration, details, additionalTerms, effectiveDate, endDate, status, partyDetails } = req.body;

    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        contractType,
        contractName,
        duration,
        details,
        additionalTerms,
        effectiveDate,
        endDate,
        status,
        partyDetails,
      },
      { new: true } // Return the updated contract
    );

    if (!updatedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({ message: 'Contract updated successfully', contract: updatedContract });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contract', error });
  }
};

// Delete a contract by ID
handleDeleteContractById = async (req, res) => {
  try {
    const deletedContract = await Contract.findByIdAndDelete(req.params.id);

    if (!deletedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contract', error });
  }
};

module.exports = {
    handleCreateNewContract,
    handleGetAllContracts,
    handleGetContractById,
    handleUpdateContractById,
    handleDeleteContractById,
};