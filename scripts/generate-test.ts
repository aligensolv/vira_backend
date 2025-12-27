import fs from 'fs';
import path from 'path';

const featureName = process.argv[2];

if (!featureName) {
  console.error('❌ Provide feature name: npm run generate:test <FeatureName>');
  process.exit(1);
}

const featureLower = featureName.toLowerCase();
const testDir = path.join('tests', featureLower);

if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

/**
 * Templates for 5 test types adapted for Jest
 * Each template includes documentation and professional structure
 */
const templates: Record<string, string> = {
  'unit.test.ts': `/**
 * Unit Test for ${featureName}
 * --------------------------------
 * Purpose:
 * - Test single functions, services, or modules in isolation
 * - No database or external service calls (mock external dependencies)
 * - Fast and deterministic
 *
 * Tools:
 * - Jest
 */
import { jest } from '@jest/globals';
import * as ${featureLower}Service from '../../src/packages/${featureLower}/${featureLower}.service';

describe('${featureName} Unit Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call getAll function once and return empty array', async () => {
    const spy = jest.spyOn(${featureLower}Service, 'getAll${featureName}s').mockResolvedValue([]);
    const result = await ${featureLower}Service.getAll${featureName}s();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
`,

  'integration.test.ts': `/**
 * Integration Test for ${featureName}
 * -----------------------------------
 * Purpose:
 * - Test how multiple modules work together
 * - Includes database calls (use a test DB)
 * - Verifies that different layers of the feature interact correctly
 *
 * Tools:
 * - Jest
 * - Supertest (HTTP request testing)
 */
import request from 'supertest';
import { app } from '../../src/app';
import setup from '../setup';

beforeAll(async () => {
  await setup(); // initialize test DB and any mocks
});

describe('${featureName} Integration Tests', () => {
  it('should fetch all ${featureLower}s from the database', async () => {
    const res = await request(app).get('/api/${featureLower}s');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
`,

  'e2e.test.ts': `/**
 * End-to-End (E2E) Test for ${featureName}
 * ----------------------------------------
 * Purpose:
 * - Test the entire system as a black box
 * - Hit actual HTTP endpoints
 * - Optionally use a seeded test database
 *
 * Tools:
 * - Jest
 * - Supertest
 */
import request from 'supertest';
import { app } from '../../src/app';
import setup from '../setup';

beforeAll(async () => {
  await setup();
});

describe('${featureName} E2E Tests', () => {
  it('should create a new ${featureLower} and return the created object', async () => {
    const payload = { name: 'E2E Test', username: 'e2e', password: '123' };
    const res = await request(app).post('/api/${featureLower}s').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ name: 'E2E Test', username: 'e2e' });
    expect(res.body.data.id).toBeDefined();
  });
});
`,

  'smoke.test.ts': `/**
 * Smoke Test for ${featureName}
 * -----------------------------
 * Purpose:
 * - Quick check to ensure that endpoints respond
 * - Verifies that the feature is at least "alive"
 *
 * Tools:
 * - Jest
 * - Supertest
 */
import request from 'supertest';
import { app } from '../../src/app';

describe('${featureName} Smoke Tests', () => {
  it('should respond with 200 for GET /api/${featureLower}s', async () => {
    const res = await request(app).get('/api/${featureLower}s');
    expect(res.status).toBe(200);
  });
});
`,

  'performance.test.ts': `/**
 * Performance Test for ${featureName}
 * -----------------------------------
 * Purpose:
 * - Stress test endpoints under load
 * - Measure response times and throughput
 *
 * Tools:
 * - Jest
 * - Supertest
 */
import request from 'supertest';
import { app } from '../../src/app';

describe('${featureName} Performance Tests', () => {
  it('should handle 100 concurrent GET requests to /api/${featureLower}s', async () => {
    const requests = Array.from({ length: 100 }, () => request(app).get('/api/${featureLower}s'));
    const results = await Promise.all(requests);
    results.forEach(res => expect(res.status).toBe(200));
  }, 20000); // extend timeout to 20s for stress test
});
`,
};

/**
 * Generate all test files
 */
for (const [filename, content] of Object.entries(templates)) {
  const filePath = path.join(testDir, filename);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Generated: ${filePath}`);
}
