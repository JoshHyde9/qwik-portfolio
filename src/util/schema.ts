import { z } from "zod";

export const createGuest = z.object({
  username: z
    .string()
    .min(1, { message: "Name must not be empty" })
    .max(50, { message: "Username has to be 50 characters or less." })
    .trim(),
  comment: z
    .string()
    .min(1, { message: "Comment must not be empty" })
    .max(256, { message: "Comment can not be more than 256 characters" })
    .trim(),
});

export type CreateGuest = z.infer<typeof createGuest>;

export type SanitisedGuests = {
  id: string;
  username: string;
  comment: string;
  createdAt: string;
};

export const sendEmailSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty" }),
  email: z.string().email(),
  subject: z.string().min(1, { message: "Subject must not be empty" }),
  message: z.string().min(1, { message: "Message must not be empty" }),
});

export type EmailData = z.infer<typeof sendEmailSchema>;
