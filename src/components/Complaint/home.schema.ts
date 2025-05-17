import { z } from "zod";

export const schema = z.object({
  description: z.string().min(5),
  fullName: z.string().min(5),
  address: z.string().min(5),
  phone: z.string().optional(),
  residenceAddress: z.string().min(5),
  photos: z.array(
    z.object({
      url: z.string(),
      id: z.string(),
    })
  ),
  institutionEmail: z.string().optional(),
  writtenEmail: z.string().optional(),
  subject: z.string().optional(),
});

export type ComplaintFormData = z.infer<typeof schema>;
