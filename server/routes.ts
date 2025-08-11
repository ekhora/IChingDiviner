import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ichingService } from "./services/iching";
import { ichingConsultationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Perform I Ching consultation
  app.post("/api/consultation", async (req, res) => {
    try {
      const validatedData = ichingConsultationSchema.parse(req.body);
      
      const results = ichingService.performMultipleReadings(
        validatedData.numberOfDraws,
        validatedData.consultationDate,
        validatedData.consultationTime
      );
      
      const summary = ichingService.generateSummary(results);
      
      const consultation = await storage.createConsultation({
        question: validatedData.question,
        consultationDate: validatedData.consultationDate,
        consultationTime: validatedData.consultationTime,
        numberOfDraws: validatedData.numberOfDraws,
        results: { readings: results, summary }
      });
      
      res.json({
        id: consultation.id,
        results: results,
        summary: summary,
        question: validatedData.question,
        consultationDate: validatedData.consultationDate,
        consultationTime: validatedData.consultationTime,
        numberOfDraws: validatedData.numberOfDraws
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get consultation by ID
  app.get("/api/consultation/:id", async (req, res) => {
    try {
      const consultation = await storage.getConsultation(req.params.id);
      
      if (!consultation) {
        res.status(404).json({ message: "Consultation not found" });
        return;
      }
      
      res.json(consultation);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all hexagrams for reference
  app.get("/api/hexagrams", async (req, res) => {
    try {
      const { ALL_HEXAGRAMS } = await import("./data/hexagrams");
      res.json(ALL_HEXAGRAMS);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get specific hexagram
  app.get("/api/hexagrams/:number", async (req, res) => {
    try {
      const hexagramNumber = parseInt(req.params.number);
      if (hexagramNumber < 1 || hexagramNumber > 64) {
        res.status(400).json({ message: "Hexagram number must be between 1 and 64" });
        return;
      }
      
      const { ALL_HEXAGRAMS } = await import("./data/hexagrams");
      const hexagram = ALL_HEXAGRAMS.find(h => h.number === hexagramNumber);
      
      if (!hexagram) {
        res.status(404).json({ message: "Hexagram not found" });
        return;
      }
      
      res.json(hexagram);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
