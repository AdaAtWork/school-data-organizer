import { describe, expect, it } from "vitest";
import { validateCreateChildInput } from "../../modules/children/mutations";

describe("validateCreateChildInput", () => {
  it("returns null for a valid first name", () => {
    expect(validateCreateChildInput({ firstName: "Alice" })).toBeNull();
  });

  it("returns an error when first name is empty", () => {
    expect(validateCreateChildInput({ firstName: "" })).toBe(
      "First name is required."
    );
  });

  it("returns an error when first name is only whitespace", () => {
    expect(validateCreateChildInput({ firstName: "   " })).toBe(
      "First name is required."
    );
  });

  it("accepts first name with surrounding whitespace", () => {
    expect(validateCreateChildInput({ firstName: "  Bob  " })).toBeNull();
  });
});
