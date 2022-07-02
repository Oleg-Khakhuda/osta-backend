import Plates from "../model/plates";
import Photo from "../model/photo";

const listPlates = async () => {
  const result = await Plates.find();
  return result;
};

const addPlate = async (body) => {
  const plate = await Plates.create({...body}
  );
  return plate;
};

// const addPhotoPlate = async(file) => {
//   const plate = await Photo.create({
//     photo: `http://localhost:${process.env.CLIENT_PORT}/static/${file.filename}`,
//   });
//   return plate;
// }

const getPlateById = async (plateId) => {
  const result = await Plates.findOne({ _id: plateId });
  return result;
};

const removePlate = async (plateId) => {
  const result = await Plates.findOneAndRemove({ _id: plateId });
  return result;
};

const updatePlate = async (plateId, body) => {
  const result = await Plates.findOneAndUpdate(
    { _id: plateId },
    { ...body },
    { new: true }
  )
  return result;
};

// const updatePlatePhoto = async (id, photoUrl) => {
//   const result = await Plates.updateOne({ _id: id }, { photoUrl });
//   return result;
// };

export default {
  listPlates,
  addPlate,
  getPlateById,
  removePlate,
  updatePlate,
  // updatePlatePhoto,
  // addPhotoPlate
}