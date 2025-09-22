/*
  # Add order_id column to enrollments table

  1. Changes
    - Add order_id column to enrollments table
    - Create index for order_id queries
*/

-- Add order_id column to enrollments table
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS order_id text;

-- Create index for order_id queries
CREATE INDEX IF NOT EXISTS enrollments_order_id_idx 
ON enrollments(order_id);