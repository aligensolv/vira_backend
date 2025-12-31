import request from "supertest";
import { app } from "../../src/app"; // import your actual Express app

describe("Helmet Middleware", () => {
  it("should add common security headers", async () => {
    const res = await request(app).get("/test"); // hit any endpoint

    // Check existence of headers (safer across Helmet versions)
    expect(res.headers).toHaveProperty("x-dns-prefetch-control");
    expect(res.headers).toHaveProperty("x-frame-options");
    expect(res.headers).toHaveProperty("x-content-type-options");
    expect(res.headers).toHaveProperty("x-download-options");
    expect(res.headers).toHaveProperty("x-xss-protection");

    // Check typical values (depending on your config)
    expect(res.headers["x-dns-prefetch-control"]).toBe("off");
    expect(["DENY", "SAMEORIGIN"]).toContain(res.headers["x-frame-options"]);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-download-options"]).toBe("noopen");
    expect(res.headers["x-xss-protection"]).toBe("0");
  });

  it("should not break the response", async () => {
    const res = await request(app).get("/test");
    expect(res.status).toBe(200);
  });
});
