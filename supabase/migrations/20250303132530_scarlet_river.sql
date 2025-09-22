/*
  # Add payment columns to consultations table

  1. New Columns
    - `amount` (integer) - Amount paid for consultation
    - `payment_id` (text) - Razorpay payment ID
    - `order_id` (text) - Razorpay order ID
    - `payment_signature` (text) - Razorpay payment signature

  2. Changes
    - Add check constraint for amount to ensure positive values
    - Add indexes for payment-related columns
*/

-- Add payment-related columns
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS amount integer CHECK (amount > 0),
ADD COLUMN IF NOT EXISTS payment_id text,
ADD COLUMN IF NOT EXISTS order_id text,
ADD COLUMN IF NOT EXISTS payment_signature text;

-- Create indexes for payment queries
CREATE INDEX IF NOT EXISTS consultations_payment_id_idx ON consultations(payment_id);
CREATE INDEX IF NOT EXISTS consultations_order_id_idx ON consultations(order_id);

-- Add payment_status column if it doesn't exist
ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS payment_status text NOT NULL 
DEFAULT 'pending'
CHECK (payment_status IN ('pending', 'completed', 'failed'));

-- Create index for payment status queries
CREATE INDEX IF NOT EXISTS consultations_payment_status_idx 
ON consultations(payment_status);