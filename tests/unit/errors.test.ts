import { describe, expect, it } from "vitest";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../../lib/errors";

describe("error classes", () => {
  it("UnauthorizedError is instanceof Error and UnauthorizedError", () => {
    const err = new UnauthorizedError("not allowed");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(UnauthorizedError);
    expect(err.message).toBe("not allowed");
    expect(err.name).toBe("UnauthorizedError");
  });

  it("NotFoundError is instanceof Error and NotFoundError", () => {
    const err = new NotFoundError("missing");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.message).toBe("missing");
    expect(err.name).toBe("NotFoundError");
  });

  it("ForbiddenError is instanceof Error and ForbiddenError", () => {
    const err = new ForbiddenError("no access");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ForbiddenError);
    expect(err.message).toBe("no access");
    expect(err.name).toBe("ForbiddenError");
  });

  it("error classes are distinct — instanceof checks do not cross", () => {
    const unauth = new UnauthorizedError();
    const notFound = new NotFoundError();
    const forbidden = new ForbiddenError();

    expect(unauth).not.toBeInstanceOf(NotFoundError);
    expect(unauth).not.toBeInstanceOf(ForbiddenError);
    expect(notFound).not.toBeInstanceOf(UnauthorizedError);
    expect(notFound).not.toBeInstanceOf(ForbiddenError);
    expect(forbidden).not.toBeInstanceOf(UnauthorizedError);
    expect(forbidden).not.toBeInstanceOf(NotFoundError);
  });

  it("uses default messages when none provided", () => {
    expect(new UnauthorizedError().message).toBe("Unauthorized");
    expect(new NotFoundError().message).toBe("Not found");
    expect(new ForbiddenError().message).toBe("Forbidden");
  });
});
