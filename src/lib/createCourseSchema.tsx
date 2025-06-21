import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be under 100 characters" }),

  smallDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" })
    .max(200, { message: "Short description must be under 200 characters" }),

  description: z
    .string()
    .min(20, { message: "Full description must be at least 20 characters" }),

  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .nonnegative({ message: "Price must be a positive number" }),

  duration: z.coerce
    .number({ invalid_type_error: "Duration must be a number" })
    .int({ message: "Duration must be an integer" })
    .nonnegative({ message: "Duration must be a positive number" }),

  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
    errorMap: () => ({ message: "Please select a valid level" }),
  }),

  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" })
    .max(50, { message: "Category must be under 50 characters" }),

  fileKey: z
    .string()
    .min(1, { message: "File key (image URL or path) is required" }),

  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
});
