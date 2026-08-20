import { describe, expect, it } from "vitest";
import moviesReducer, { clearSearch, setActiveGenre } from "./moviesSlice";

describe("moviesSlice", () => {
  it("stores the selected genre", () => {
    expect(moviesReducer(undefined, setActiveGenre(28)).activeGenre).toBe(28);
  });

  it("clears search-specific state while retaining other movie data", () => {
    const state = {
      trending: [{ id: 1 }], results: [{ id: 2 }], currentMovie: null, genres: [], query: "alien",
      activeGenre: 878, page: 3, totalPages: 12, status: "succeeded", error: null,
    };

    expect(moviesReducer(state, clearSearch())).toMatchObject({
      trending: [{ id: 1 }], results: [], query: "", page: 1, totalPages: 1, activeGenre: 878,
    });
  });
});
