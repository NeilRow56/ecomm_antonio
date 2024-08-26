"use server";

import * as z from "zod";

import db from "@/lib/db";
import { CreateStoreSchema } from "@/schemas/stores";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const store_creation = async (
  values: z.infer<typeof CreateStoreSchema>
) => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const validatedFields = CreateStoreSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name } = validatedFields.data;

  try {
    await db.store.create({
      data: {
        name,
        userId: userId,
      },
    });
    revalidatePath("/");
    return { success: "Store creation successful!" };
  } catch (error) {
    return { message: "Database Error: Failed to Update Settings." };
  }
};
