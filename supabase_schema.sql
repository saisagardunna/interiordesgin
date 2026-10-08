-- SQL Schema script to set up Supabase tables for SAID Atelier Interior Design Website
-- Copy and run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Table for Scheduled Calls / Consultations
CREATE TABLE IF NOT EXISTS public.scheduled_calls (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    location TEXT,
    service_required TEXT,
    estimated_budget TEXT,
    scheduled_date TEXT NOT NULL,
    scheduled_time TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table for Client Contact Inquiries & GPS Submissions
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    location TEXT,
    service TEXT,
    budget TEXT,
    message TEXT,
    coordinates TEXT,
    google_maps_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table for Client Reviews & Testimonials
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    author TEXT NOT NULL,
    role TEXT,
    location TEXT,
    project TEXT,
    quote TEXT NOT NULL,
    rating NUMERIC DEFAULT 5,
    published BOOLEAN DEFAULT TRUE,
    created_at TEXT
);

-- 4. Table for Studio Settings & Pricing Rates
CREATE TABLE IF NOT EXISTS public.studio_settings (
    id TEXT PRIMARY KEY DEFAULT 'main_settings',
    contact_email TEXT,
    contact_phone TEXT,
    location_address TEXT,
    latitude NUMERIC,
    longitude NUMERIC,
    rates_2bhk TEXT,
    rates_3bhk TEXT,
    rates_4bhk_villa TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) policies allowing public access (or disable RLS for direct access)
ALTER TABLE public.scheduled_calls DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.studio_settings DISABLE ROW LEVEL SECURITY;
