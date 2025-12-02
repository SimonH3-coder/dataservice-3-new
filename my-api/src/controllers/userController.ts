import { Request, Response } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
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
    const data = await prisma.user.findUnique({
      where: { id },
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
  const { firstname, lastname, email, password, role, isActive } = req.body;

  if (!firstname || !lastname || !email || !password || !role || !isActive) {
    return res.status(400).json({ error: "All data is required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
        isActive: Boolean(isActive),
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
  const { firstname, lastname, email, role, isActive } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id skal have en gyldig værid" });
  }

  if (!firstname || !lastname || !email || !role || !isActive) {
    return res.status(400).json({ error: "Alle felter skal udfyldes" });
  }

  try {
    const data = await prisma.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        email,
        role,
        isActive: Boolean(isActive),
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
};
