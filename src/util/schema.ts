import { z } from "zod";

export const createGuest = z.object({
  username: z
    .string()
    .min(1, { message: "Username must not be empty" })
    .max(50, { message: "Username has to be 50 characters or less." }),
  comment: z
    .string()
    .min(1, { message: "Comment must not be empty" })
    .max(256, { message: "Comment can not be more than 256 characters" }),
});

export type GuestData = {
  username: string;
  comment: string;
};

export type SanitisedGuests = {
  id: string;
  username: string;
  comment: string;
  createdAt: string;
};
