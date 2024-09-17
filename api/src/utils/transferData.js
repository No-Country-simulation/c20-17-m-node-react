import Transfer from "../models/transfer";

//funcion crea transfers:
export const transfers = async (user) => {
    return await Transfer.aggregate([
      {
        $match: {
          $or: [{ emisor_id: user._id }, { receptor_id: user._id }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "users",
          localField: "emisor_id",
          foreignField: "_id",
          as: "emisor",
        },
      },
      {
        $unwind: "$emisor",
      },
      {
        $lookup: {
          from: "users",
          localField: "receptor_id",
          foreignField: "_id",
          as: "receptor",
        },
      },
      {
        $unwind: "$receptor",
      },
  
      {
        $project: {
          _id: 1,
          mount: 1,
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          emisor: {
            firstname: "$emisor.first_name",
            lastname: "$emisor.last_name",
            emisorId: "$emisor._id",
          },
          receptor: {
            firstname: "$receptor.first_name",
            lastname: "$receptor.last_name",
            receptorId: "$receptor._id",
          },
        },
      },
    ]);
  }