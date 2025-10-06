const { default: mongoose } = require("mongoose");
const { getAccountModel } = require("../helper/AccountHelper");
const TransferAccount = require("../models/TransferAccount");

exports.createTransferAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const FromModel = getAccountModel(req.body.facType);
    const ToModel = getAccountModel(req.body.sacType);
    const bankAccount = await TransferAccount.create([req.body], { session });

    if (req.body.facACno && req.body.sacACno && req.body.status === 'completed') {
      await FromModel.findByIdAndUpdate(
        req.body.facACno,
        { $inc: { balance: -Number(req.body.amount) } },
        { session }
      );
      await ToModel.findByIdAndUpdate(
        req.body.sacACno,
        { $inc: { balance: Number(req.body.amount) } },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .json({ message: "Transfer Amount Successfully", data: { bankAccount } });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTransferAccount = async (req, res) => {
  try {
    const bankAccount = await TransferAccount.find().sort({ regdate: -1 });

    const transfer = await Promise.all(
      bankAccount.map(async (bank) => {
        const FromModel = getAccountModel(bank?.facType);
        const ToModel = getAccountModel(bank?.sacType);

        const fromAcc = await FromModel.findById({
          _id: bank?.facACno,
        });
        const toAcc = await ToModel.findById({ _id: bank?.sacACno });

        return {
          ...bank.toObject(),
          fromAccountName: fromAcc ? fromAcc?.accountName : null,
          fromAccountNo: fromAcc ? fromAcc?.accountNo : null,
          toAccountNo: toAcc ? toAcc?.accountNo : null,
          toAccountName: toAcc ? toAcc?.accountName : null,
        };
      })
    );
    res.status(200).json({ data: transfer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransferAccountById = async (req, res) => {
  try {
    const bankAccount = await TransferAccount.findById(req.params.id);
    if (!bankAccount) {
      return res
        .status(404)
        .json({ message: "Transfer amount Details Not Found" });
    }

    res.status(200).json({ data: bankAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTransferAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existing = await TransferAccount.findById(req.params.id).session(
      session
    );

    if (!existing) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Transfer details not found" });
    }

    if (existing.facACno && existing.sacACno && existing.status === "completed") {
      await getAccountModel(existing.facType).findByIdAndUpdate(
        existing.facACno,
        { $inc: { balance: Number(existing.amount) } },
        { session }
      );
      await getAccountModel(existing.sacType).findByIdAndUpdate(
        existing.sacACno,
        { $inc: { balance: -Number(existing.amount) } },
        { session }
      );
    }

    // Apply new transfer
    if (req.body.facACno && req.body.sacACno && req.body.status==='completed') {
      await getAccountModel(req.body.facType).findByIdAndUpdate(
        req.body.facACno,
        { $inc: { balance: -Number(req.body.amount) } },
        { session }
      );
      await getAccountModel(req.body.sacType).findByIdAndUpdate(
        req.body.sacACno,
        { $inc: { balance: Number(req.body.amount) } },
        { session }
      );
    }

    const bankAccount = await TransferAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    session.endSession();
    res
      .status(200)
      .json({ message: "Transfer Update Successfully", data: { bankAccount } });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};



exports.deleteTransferAccount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transfer = await TransferAccount.findById(req.params.id).session(session);

    if (!transfer) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Transfer not found" });
    }

    // Reverse balances if transfer was completed
    if (transfer.status === "completed" && transfer.facACno && transfer.sacACno) {
      await getAccountModel(transfer.facType).findByIdAndUpdate(
        transfer.facACno,
        { $inc: { balance: Number(transfer.amount) } },
        { session }
      );
      await getAccountModel(transfer.sacType).findByIdAndUpdate(
        transfer.sacACno,
        { $inc: { balance: -Number(transfer.amount) } },
        { session }
      );
    }

    // Delete the transfer
    await TransferAccount.findByIdAndDelete(req.params.id).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Transfer deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

