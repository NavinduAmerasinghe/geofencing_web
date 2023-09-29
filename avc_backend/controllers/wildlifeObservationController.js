const WildlifeObservation = require("../models/wildlifeObservation");
const cloudinary = require("../utils/cloudinary-config");
const distance = require("../calcDistance/calcDistance");

//create new observation
// exports.createObservation = async (req, res, next) => {
//   const {
//     animalName,
//     image,
//     taxonGroup,
//     location,
//     observationDate,
//     observationTime,
//     dayNight,
//     climateType,
//     observationRoad,
//     roadCondition,
//     trafficType,
//   } = req.body;
//   try {
//     const result = await cloudinary.uploader.upload(image, {
//       folder: "wildLifeAnimls",
//       //width:300,
//       //crop:"scale"
//     });

//     const observation = await WildlifeObservation.create({
//       animalName,
//       // image: {
//       //   public_id: result.public_id,
//       //   url: result.secure_url,
//       // },
//       image,
//       taxonGroup,
//       location,
//       observationDate,
//       observationTime,
//       dayNight,
//       climateType,
//       observationRoad,
//       roadCondition,
//       trafficType,
//     });
//     res.status(201).json({
//       success: true,
//       observation,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// exports.createObservation = async (req, res, next) => {
//   try {
//     const {
//       animalName,
//       taxonGroup,
//       location,
//       observationDate,
//       observationTime,
//       dayNight,
//       climateType,
//       observationRoad,
//       roadCondition,
//       trafficType,
//     } = req.body;

//     const result = await cloudinary.uploader.upload(req.file.buffer, {
//       // Updated this line
//       folder: "wildLifeAnimls",
//     });

//     const observation = await WildlifeObservation.create({
//       animalName,
//       image: {
//         data: req.file.buffer, // Updated this line
//         contentType: req.file.mimetype, // Updated this line
//       },
//       taxonGroup,
//       location,
//       observationDate,
//       observationTime,
//       dayNight,
//       climateType,
//       observationRoad,
//       roadCondition,
//       trafficType,
//     });

//     await observation.save();

//     res.status(201).json({
//       success: true,
//       observation,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };
exports.createObservation = async (req, res, next) => {
  const {
    animalName,
    image,
    taxonGroup,
    location,
    observationDate,
    observationTime,
    dayNight,
    climateType,
    observationRoad,
    roadCondition,
    trafficType,
    isApproved,
  } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "wildLifeAnimls",
      //width:300,
      //crop:"scale"
    });

    const observation = await WildlifeObservation.create({
      animalName,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      // image,
      taxonGroup,
      location,
      observationDate,
      observationTime,
      dayNight,
      climateType,
      observationRoad,
      roadCondition,
      trafficType,
      isApproved,
    });
    res.status(201).json({
      success: true,
      observation,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//Retrive a list of observations
exports.getObservations = async (req, res, next) => {
  try {
    const observations = await WildlifeObservation.find();
    res.send(observations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Retrive a single observation by ID
exports.getObservation = async (req, res, next) => {
  try {
    const observation = await WildlifeObservation.findById(req.params.id);
    if (!observation) {
      return res.status(404).send();
    }
    res.send(observation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//updating an exsisting observation
exports.updateObservation = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "animalName",
    "image",
    "taxonGroup",
    "location",
    "observationDate",
    "observationTime",
    "dayNight",
    "climateType",
    "observationRoad",
    "roadCondition",
    "trafficType",
    "isApproved",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const observation = await WildlifeObservation.findById(req.params.id);

    if (!observation) {
      res.status(404).send();
      return;
    }

    // Update fields from request body
    updates.forEach((update) => {
      observation[update] = req.body[update];
    });

    // Upload new image if present in the request body
    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: "wildLifeAnimls",
        //width:300,
        //crop:"scale"
      });

      observation.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await observation.save();

    res.json(observation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteObservation = async (req, res) => {
  try {
    const observation = await WildlifeObservation.findByIdAndDelete(
      req.params.id
    );
    if (!observation) {
      return res.status(404).send();
    }
    res.send(observation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.observationSummary = async (req, res, next) => {
  try {
    const lastCreated = await WildlifeObservation.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 1 },
    ]);
    const lastCreatedFormatted = {
      ...lastCreated[0]._doc,
      createdAt: lastCreated[0].createdAt.toLocaleString(),
    };
    const firstCreated = await WildlifeObservation.aggregate([
      { $sort: { createdAt: 1 } },
      { $limit: 1 },
    ]);
    const firstCreatedFormatted = {
      ...firstCreated[0]._doc,
      createdAt: firstCreated[0].createdAt.toLocaleString(),
    };
    const summaryData = {
      lastCreated: lastCreatedFormatted,
      firstCreated: firstCreatedFormatted,
    };
    res.send(summaryData);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.animalObservationTimeStats = async (req, res, next) => {
  try {
    const observationStats = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: {
            animalName: "$animalName",
            taxonGroup: "$taxonGroup",
            observationTIme: {
              $cond: [
                { $lt: [{ $hour: "$observationTime" }, 6] },
                "12am-6am",
                {
                  $cond: [
                    { $lt: [{ $hour: "$observationTime" }, 12] },
                    "6am-12pm",
                    {
                      $cond: [
                        { $lt: [{ $hour: "$observationIme" }, 18] },
                        "12pm-6pm",
                        {
                          $cond: [
                            { $lt: [{ $hour: "$observationTime" }, 24] },
                            "6pm-12am",
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          animalName: "$_id.animalName",
          taxonGroup: "$_id.taxonGroup",
          observationTime: "$_id.observationTime",
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.send(observationStats);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.animalCountByParameters = async (req, res, next) => {
  try {
    const animalCounts = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: { dayNight: "$dayNight" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          dayNight: "$_id.dayNight",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const climateTypeCounts = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: { climateType: "$climateType" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          climateType: "$_id.climateType",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const observationRoadCounts = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: { observationRoad: "$observationRoad" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          observationRoad: "$_id.observationRoad",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const roadConditionCounts = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: { roadCondition: "$roadCondition" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          roadCondition: "$_id.roadCondition",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const trafficTypeCounts = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: { trafficType: "$trafficType" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          trafficType: "$_id.trafficType",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json({
      dayNight: animalCounts,
      climateType: climateTypeCounts,
      observationRoad: observationRoadCounts,
      roadCondition: roadConditionCounts,
      trafficType: trafficTypeCounts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.mostSceanAnimalDayNightStat = async (req, res, next) => {
  try {
    const dayObservations = await WildlifeObservation.aggregate([
      {
        $match: {
          dayNight: "Day",
        },
      },
      {
        $group: {
          _id: "$animalName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const nightObservations = await WildlifeObservation.aggregate([
      {
        $match: {
          dayNight: "Night",
        },
      },
      {
        $group: {
          _id: "$animalName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.json({
      dayObservations,
      nightObservations,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAnimalCountByDate = async (req, res) => {
  try {
    const result = await WildlifeObservation.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%m/%d/%Y", date: "$observationDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    // result.forEach((entry) => {
    //   console.log(`${entry.date} - ${entry.count} records`);
    // });

    // return result;
    res.json(result);
  } catch (error) {
    console.error("Error occurred while counting animal records:", error);
    throw error;
  }
};

exports.getObservationsforLocation = async (req, res, next) => {
  const { lat, long } = req.body;
  //console.log(lat,long);

  var id = null;
  var dis;
  const locations = [];
  try {
    const observations = await WildlifeObservation.find();

    if (observations) {
      let newObservation = [];

      for (let i = 0; i < observations.length; i++) {
        id = observations[i]._id;

        locations.push({
          lat: observations[i].location.coordinates[0],
          long: observations[i].location.coordinates[1],
        });
        dis = distance(lat, long, locations[i].lat, locations[i].long, "K");
        console.log(dis);
        if (dis < 25) {
          const newObject = new Object();
          newObject["animalName"] = observations[i].animalName;
          newObject["distance"] = dis;
          newObject["time"] = new Date();
          newObservation.push(newObject);
        }
      }

      if (newObservation.length > 0) {
        res.status(200).json({
          data: { newObservation },
          status: "Warning",
          message: "New location detected near you",
        });
      } else {
        res.status(200).json({
          data: { newObservation },
          status: "Normal",
          message: "No New location detected near you",
        });
      }
    } else {
      res.status(400).json({
        data: {},
        status: "Error",
        message: "Database error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
