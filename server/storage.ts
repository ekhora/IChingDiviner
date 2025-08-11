import { type Consultation, type InsertConsultation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultation(id: string): Promise<Consultation | undefined>;
  getAllConsultations(): Promise<Consultation[]>;
}

export class MemStorage implements IStorage {
  private consultations: Map<string, Consultation>;

  constructor() {
    this.consultations = new Map();
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = randomUUID();
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      createdAt: new Date(),
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultation(id: string): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  async getAllConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }
}

export const storage = new MemStorage();
