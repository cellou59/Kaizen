import { beforeEach, describe, expect, it } from "vitest";
import { storage } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null for missing key", () => {
    expect(storage.get("missing")).toBeNull();
  });

  it("stores and retrieves a value", () => {
    storage.set("key", { a: 1 });
    expect(storage.get("key")).toEqual({ a: 1 });
  });

  it("removes a value", () => {
    storage.set("key", "value");
    storage.remove("key");
    expect(storage.get("key")).toBeNull();
  });

  it("returns null for invalid JSON", () => {
    localStorage.setItem("bad", "not-json");
    expect(storage.get("bad")).toBeNull();
  });
});
