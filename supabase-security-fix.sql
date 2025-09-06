-- Enable Row Level Security (RLS) on all public tables
-- This fixes the critical security vulnerabilities detected by Supabase

-- Enable RLS on all tables
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;

-- Create security policies

-- Product policies: Public read access, no write access via PostgREST
CREATE POLICY "Products are publicly readable" ON "Product"
    FOR SELECT USING (true);

-- User policies: Users can only access their own data
CREATE POLICY "Users can view their own profile" ON "User"
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own profile" ON "User"
    FOR UPDATE USING (auth.uid()::text = id);

-- Order policies: Users can only access their own orders
CREATE POLICY "Users can view their own orders" ON "Order"
    FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can create their own orders" ON "Order"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- OrderItem policies: Users can only access order items from their own orders
CREATE POLICY "Users can view their own order items" ON "OrderItem"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "Order" 
            WHERE "Order".id = "OrderItem"."orderId" 
            AND "Order"."userId" = auth.uid()::text
        )
    );

CREATE POLICY "Users can create order items for their own orders" ON "OrderItem"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM "Order" 
            WHERE "Order".id = "OrderItem"."orderId" 
            AND "Order"."userId" = auth.uid()::text
        )
    );