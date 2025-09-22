/*
  # Add payment status to consultations table

  1. Changes
    - Add payment_status column to consultations table
    - Set default value to 'pending'
    - Add check constraint to ensure valid status values

  2. Notes
    - Valid payment statuses: 'pending', 'completed', 'failed'
    - Existing rows will have 'pending' status
*/

-- Add payment_status column with check constraint
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS payment_status text NOT NULL 
DEFAULT 'pending'
CHECK (payment_status IN ('pending', 'completed', 'failed'));

-- Create index for payment status queries
CREATE INDEX IF NOT EXISTS consultations_payment_status_idx 
ON consultations(payment_status);