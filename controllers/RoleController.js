const Role = require('../models/Role');


exports.getAllRole = async (req, res) => {
  try {

    const roles = await Role.aggregate([
      {
        $addFields: {
          compidObj: { $toObjectId: "$compid" } // Convert string to ObjectId
        }
      },
      {
        $lookup: {
          from: 'companies',       // collection name (lowercase + plural)
          localField: 'compidObj', // converted ObjectId
          foreignField: '_id',     // company _id
          as: 'companyData'
        }
      },
      {
        $unwind: {
          path: '$companyData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          compid: 1,
          levelName: 1,
          status: 1,
          regby: 1,
          upby: 1,
          regdate: 1,
          update: 1,
          companyName: '$companyData.com_name'
        }
      },
      { $sort: { regdate: -1 } }
    ]);


    res.status(200).json({ data: roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ data: role })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


// exports.getAllRole = async (req, res) => {
//   try {
//     const role = await Role.find().sort({ regdate: -1 })
//     res.status(200).json({ data: role })

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id)
    if (!role) {
      return res.status(404).json({ message: 'Role not found' })
    }
    res.status(200).json({ data: role })

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!role) {
      return res.status(404).json({ message: 'Role not found' })
    }
    res.status(200).json({ data: role })

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id)
    if (!role) {
      return res.status(404).json({ message: 'Role not found' })
    }
    res.status(200).json({ message: 'Deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}