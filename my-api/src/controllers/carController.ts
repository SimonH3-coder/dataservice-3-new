import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { category, brand, model, year, price, fuelType } = req.body;

  if (!category || !brand || !model || !year || !price || !fuelType) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const data = await prisma.car.create({
      data: {
        category,
        brand,
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
