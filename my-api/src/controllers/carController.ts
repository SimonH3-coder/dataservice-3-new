import { Request, Response } from "express";
import { prisma } from "../prisma.js";

/**
 * Method Get Records
 * @param req
 * @param res
 * @returns Array
 */

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany({
      include: {
        brand: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

/**
 * Method Get Record
 * @param req
 * @param res
 * @returns Object
 */

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Id is missing " });
  }

  try {
    const data = await prisma.car.findUnique({
      where: { id },
      select: {
        id: true,
        model: true,
        brand: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

/** * Method Create Record
 * @param req
 * @param res
 * @returns Object
 */

export const createRecord = async (req: Request, res: Response) => {
  const { category, brandId, model, year, price, fuelType } = req.body;

  if (!category || !brandId || !model || !year || !price || !fuelType) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const data = await prisma.car.create({
      data: {
        category,
        brandId: Number(brandId),
        model,
        year: Number(year),
        price,
        fuelType,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Somthing went wrong" });
  }
};

/** Method Update Record
 * @param req
 * @param res
 * @returns Object
 */

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id); //sikrer at id er et tal
  const { category, brand, model, year, price, fuelType } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id skal have en gyldig værid" });
  }

  if (!category || !brand || !model || !year || !price || !fuelType) {
    return res.status(400).json({ error: "Alle felter skal udfyldes" });
  }

  try {
    const data = await prisma.car.update({
      where: { id },
      data: {
        category,
        brandId: Number(brandId),
        model,
        year: Number(year),
        price,
        fuelType,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Noget gik galt i serveren" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Id is missing " });
  }

  try {
    const data = await prisma.car.delete({
      where: { id },
    });
    res.status(200).json({
      message: "Record deleted",
      deleteId: id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete record" });
  }
};
