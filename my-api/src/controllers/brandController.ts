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
    const data = await prisma.brand.findMany();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch brands" });
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
    const data = await prisma.brand.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        logoUrl: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

/**
 * Method Get Record
 * @param req
 * @param res
 * @returns Object
 */

export const createRecord = async (req: Request, res: Response) => {
  const { name, logoUrl } = req.body;

  if (!name || !logoUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const data = await prisma.brand.create({
      data: {
        name,
        logoUrl,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/** * Method Create Record
 * @param req
 * @param res
 * @returns Object
 */

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id); //Sikker at id er et tal
  const { name, logoUrl } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id skal have en gyldig værdi" });
  }

  if (!name || !logoUrl) {
    return res.status(400).json({ error: "Alle felter skal udfyldes" });
  }

  try {
    const data = await prisma.brand.update({
      where: { id },
      data: {
        name,
        logoUrl,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Noget gik galt med serveren" });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Id is missing" });
  }

  try {
    const data = await prisma.brand.delete({
      where: { id },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete record" });
  }
};
