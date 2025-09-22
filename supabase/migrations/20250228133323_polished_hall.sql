/*
  # Add payment fields to enrollments table
  
  1. Changes
    - Add payment_id column for Razorpay payment ID
    - Add payment_signature column for Razorpay signature
    - Add amount column for payment amount
    - Add payment_status column for tracking payment state
*/

-- Add payment-related columns to enrollments table
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS payment_id text,
ADD COLUMN IF NOT EXISTS payment_signature text,
ADD COLUMN IF NOT EXISTS amount integer,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending'
CHECK (payment_status IN ('pending', 'completed', 'failed'));

-- Create index for payment status queries
CREATE INDEX IF NOT EXISTS enrollments_payment_status_idx 
ON enrollments(payment_status);

-- Create index for payment ID queries
CREATE INDEX IF NOT EXISTS enrollments_payment_id_idx 
ON enrollments(payment_id);