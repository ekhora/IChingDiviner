# I Ching Oracle Application

## Overview

This is a full-stack I Ching Oracle web application that provides users with ancient Chinese divination readings through a modern interface. The application allows users to pose questions and receive hexagram-based consultations with detailed interpretations including changing lines, zodiac animals, and five elements analysis. Built with React and Express, it features an elegant UI using shadcn/ui components and provides comprehensive reading results with multiple hexagram draws.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: React Query (TanStack Query) for server state management with custom query client configuration
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Design System**: Custom design tokens using CSS variables, Inter and Crimson Text fonts, with a neutral color palette

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with a single consultation endpoint (`/api/consultation`)
- **Data Storage**: In-memory storage using Map for consultations (designed to be easily replaceable with database)
- **Validation**: Zod schemas for request/response validation
- **I Ching Logic**: Custom service layer implementing hexagram generation, changing lines calculation, and interpretation logic
- **Development**: Hot module replacement with Vite integration for seamless development experience

### Core Business Logic
- **I Ching Service**: Generates random hexagrams, calculates changing lines, determines resulting hexagrams, and provides detailed interpretations
- **Hexagram Data**: Complete dataset of 64 I Ching hexagrams with Chinese names, meanings, judgments, and images
- **Multiple Readings**: Support for 1-100 simultaneous readings per consultation
- **Metaphysical Elements**: Integration of zodiac animals, five elements, and six relatives system for comprehensive readings

### Data Models
- **Consultation Schema**: Stores question, date/time, number of draws, and complete results
- **Hexagram Structure**: Includes lines (yin/yang), trigrams, names, meanings, and interpretations
- **Reading Results**: Primary hexagram, changing lines, resulting hexagram, strongest line analysis, and interpretation

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod resolvers
- **Build Tools**: Vite with React plugin, TypeScript compiler, PostCSS with Tailwind
- **State Management**: TanStack React Query for server state, Wouter for routing

### UI Component Libraries
- **Radix UI**: Comprehensive set of headless UI primitives (30+ components including Dialog, Select, Toast, etc.)
- **Styling**: Tailwind CSS, class-variance-authority for component variants, clsx for conditional classes
- **Icons**: Font Awesome 6 via CDN, Lucide React icons
- **Fonts**: Google Fonts (Inter, Crimson Text) loaded via CDN

### Development Tools
- **Replit Integration**: Vite plugin for runtime error modal, cartographer plugin for development
- **Database Preparation**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless driver
- **Type Safety**: TypeScript with strict configuration, Zod for runtime validation

### Production Considerations
- **Database**: Configured for PostgreSQL with Drizzle ORM (currently using in-memory storage)
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Build**: ESBuild for server bundling, Vite for client bundling
- **Deployment**: Node.js production server with static file serving

The application is architected for easy migration from in-memory storage to PostgreSQL database, with all schemas and ORM configuration already in place.