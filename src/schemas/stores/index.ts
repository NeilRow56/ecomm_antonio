import { z } from "zod";

export const StoreSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateStoreSchema = StoreSchema.omit({ id: true });
export const UpdateStoreSchema = StoreSchema;
export const DeleteStoreSchema = StoreSchema.pick({ id: true });

export type CreateStoreValues = z.infer<typeof CreateStoreSchema>;
export type UpdateStoreValues = z.infer<typeof UpdateStoreSchema>;
export type DeleteStoreValues = z.infer<typeof DeleteStoreSchema>;
