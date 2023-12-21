import Package from "../models/package.model";

export const createPackage = async (req, res, next) => {
  const {
    sender,
    fromLocation,
    receiver,
    toLocation,
    packageType,
    totalValue,
    weight,
    shippingCost,
    cashOnDelivery,
    deliveryStatus,
  } = req.body;
  const newPackage = new Package({
    sender,
    fromLocation,
    receiver,
    toLocation,
    packageType,
    totalValue,
    weight,
    shippingCost,
    cashOnDelivery,
    deliveryStatus,
  });

  try {
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    next(error);
  }
};

export const getPackages = async (req, res, next) => {
	try {
		const packages = await Package.find();
		res.status(200).json(packages);
	} catch (error) {
		next(error);
	}
}


