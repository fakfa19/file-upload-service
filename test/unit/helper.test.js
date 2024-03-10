const { allowedMimeType } = require("../../utils/helper");

describe("Test allowedMimeType function", () => {
  test("should return true for allowed file types", () => {
    expect(allowedMimeType("text/plain")).toBe(true);
    expect(allowedMimeType("application/pdf")).toBe(true);
    expect(allowedMimeType("image/heic")).toBe(true);
    expect(allowedMimeType("image/heif")).toBe(true);
    expect(allowedMimeType("image/jpeg")).toBe(true);
    expect(allowedMimeType("image/gif")).toBe(true);
    expect(allowedMimeType("image/png")).toBe(true);
    expect(allowedMimeType("image/tiff")).toBe(true);
  });

  test("should return false for disallowed file types", () => {
    expect(allowedMimeType("application/msword")).toBe(false);
    expect(allowedMimeType("text/csv")).toBe(false);
    expect(allowedMimeType("text/html")).toBe(false);
  });
});
