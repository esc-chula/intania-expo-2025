-- add createdAt and updatedAt columns to Token table
ALTER TABLE "Token" ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL;

-- add cron job to automatically delete expired tokens
CREATE EXTENSION pg_cron;
SELECT cron.schedule(
'delete_old_tokens', 
'0 3 * * *',  -- Runs at 3 AM daily
'DELETE FROM "Token" WHERE updatedAt < NOW() - INTERVAL ''24 hours'';'
);