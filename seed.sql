-- Seed: Default system memory entries
-- No users seeded — users self-register via the setup flow
-- PIN will be hashed at registration time

-- Heartbeat baseline
INSERT INTO heartbeat_log (status, latency_ms, details)
VALUES ('ok', 0, '{"event": "system_initialized", "version": "1.0.0"}');
