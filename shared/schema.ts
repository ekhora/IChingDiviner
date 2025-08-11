import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const consultations = pgTable("consultations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  consultationDate: text("consultation_date").notNull(),
  consultationTime: text("consultation_time").notNull(),
  numberOfDraws: integer("number_of_draws").notNull(),
  results: jsonb("results").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertConsultationSchema = createInsertSchema(consultations).pick({
  question: true,
  consultationDate: true,
  consultationTime: true,
  numberOfDraws: true,
  results: true,
});

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

// I Ching specific types
export const ichingConsultationSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters long"),
  consultationDate: z.string(),
  consultationTime: z.string(),
  numberOfDraws: z.number().min(1).max(100),
});

export type IChingConsultation = z.infer<typeof ichingConsultationSchema>;
