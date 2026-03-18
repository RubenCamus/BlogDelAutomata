// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string().optional(),
    slug: z.string().optional(), // opcional
  }),
});

export const collections = { blog };