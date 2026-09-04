import { describe, it, expect } from "vitest";
import adminReducer, {
  fetchDashboard, fetchAdminUsers, fetchAdminMovies,
  fetchAdminClubs, fetchAdminPosts, fetchAdminReports,
  fetchAdminReviews, updateUserStatus, deleteAdminUser, updateAdminReport,
  updateAdminReview, deleteAdminReview, clearSelectedUser,
} from "./adminSlice";

const initial = adminReducer(undefined, { type: "@@INIT" });

describe("adminSlice — initial state", () => {
  it("has idle status for all sections", () => {
    expect(initial.dashboard.status).toBe("idle");
    expect(initial.users.status).toBe("idle");
    expect(initial.movies.status).toBe("idle");
    expect(initial.clubs.status).toBe("idle");
    expect(initial.posts.status).toBe("idle");
    expect(initial.reviews.status).toBe("idle");
    expect(initial.reports.status).toBe("idle");
    expect(initial.analytics.status).toBe("idle");
  });
});

describe("adminSlice — loading states", () => {
  it("sets users status to loading on fetchAdminUsers.pending", () => {
    const state = adminReducer(initial, fetchAdminUsers.pending("", {}));
    expect(state.users.status).toBe("loading");
    expect(state.users.error).toBeNull();
  });

  it("sets movies status to loading on fetchAdminMovies.pending", () => {
    const state = adminReducer(initial, fetchAdminMovies.pending("", {}));
    expect(state.movies.status).toBe("loading");
  });

  it("sets clubs status to loading on fetchAdminClubs.pending", () => {
    const state = adminReducer(initial, fetchAdminClubs.pending("", {}));
    expect(state.clubs.status).toBe("loading");
  });

  it("sets posts status to loading on fetchAdminPosts.pending", () => {
    const state = adminReducer(initial, fetchAdminPosts.pending("", {}));
    expect(state.posts.status).toBe("loading");
  });

  it("sets reports status to loading on fetchAdminReports.pending", () => {
    const state = adminReducer(initial, fetchAdminReports.pending("", {}));
    expect(state.reports.status).toBe("loading");
  });

  it("sets dashboard status to loading on fetchDashboard.pending", () => {
    const state = adminReducer(initial, fetchDashboard.pending("", undefined));
    expect(state.dashboard.status).toBe("loading");
  });
});

describe("adminSlice — fulfilled states", () => {
  it("stores users list and count from paginated response", () => {
    const payload = { results: [{ id: 1, username: "alice" }], count: 1 };
    const state = adminReducer(initial, fetchAdminUsers.fulfilled(payload, ""));
    expect(state.users.status).toBe("succeeded");
    expect(state.users.items).toHaveLength(1);
    expect(state.users.count).toBe(1);
  });

  it("stores users list from flat array response", () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const state = adminReducer(initial, fetchAdminUsers.fulfilled(payload, ""));
    expect(state.users.items).toHaveLength(2);
    expect(state.users.count).toBe(2);
  });

  it("stores dashboard data", () => {
    const payload = { total_users: 42, active_users: 30 };
    const state = adminReducer(initial, fetchDashboard.fulfilled(payload, ""));
    expect(state.dashboard.data).toEqual(payload);
    expect(state.dashboard.status).toBe("succeeded");
  });

  it("updates a user in the list on updateUserStatus.fulfilled", () => {
    const withUsers = adminReducer(
      initial,
      fetchAdminUsers.fulfilled({ results: [{ id: 1, is_active: true }], count: 1 }, "")
    );
    const updated = adminReducer(withUsers, updateUserStatus.fulfilled({ id: 1, is_active: false }, ""));
    expect(updated.users.items[0].is_active).toBe(false);
  });

  it("removes a user from the list on deleteAdminUser.fulfilled", () => {
    const withUsers = adminReducer(
      initial,
      fetchAdminUsers.fulfilled({ results: [{ id: 1 }, { id: 2 }], count: 2 }, "")
    );
    const after = adminReducer(withUsers, deleteAdminUser.fulfilled(1, ""));
    expect(after.users.items).toHaveLength(1);
    expect(after.users.items[0].id).toBe(2);
  });

  it("updates a report status on updateAdminReport.fulfilled", () => {
    const withReports = adminReducer(
      initial,
      fetchAdminReports.fulfilled({ results: [{ id: 5, status: "pending" }], count: 1 }, "")
    );
    const after = adminReducer(withReports, updateAdminReport.fulfilled({ id: 5, status: "resolved" }, ""));
    expect(after.reports.items[0].status).toBe("resolved");
  });

  it("updates a review on updateAdminReview.fulfilled", () => {
    const withReviews = adminReducer(
      initial,
      fetchAdminReviews.fulfilled({ results: [{ id: 8, status: "VISIBLE" }], count: 1 }, "")
    );
    const after = adminReducer(withReviews, updateAdminReview.fulfilled({ id: 8, status: "REMOVED" }, ""));
    expect(after.reviews.items[0].status).toBe("REMOVED");
  });

  it("removes a review only after deleteAdminReview.fulfilled", () => {
    const withReviews = adminReducer(
      initial,
      fetchAdminReviews.fulfilled({ results: [{ id: 8 }, { id: 9 }], count: 2 }, "")
    );
    const after = adminReducer(withReviews, deleteAdminReview.fulfilled(8, ""));
    expect(after.reviews.items.map((review) => review.id)).toEqual([9]);
  });
});

describe("adminSlice — error states", () => {
  it("sets failed status and stores error message", () => {
    const state = adminReducer(initial, fetchAdminUsers.rejected(null, "", {}, "Network Error"));
    expect(state.users.status).toBe("failed");
    expect(state.users.error).toBe("Network Error");
  });
});

describe("adminSlice — clearSelectedUser", () => {
  it("clears the selected user", () => {
    const withSelected = { ...initial, users: { ...initial.users, selected: { id: 1 } } };
    const state = adminReducer(withSelected, clearSelectedUser());
    expect(state.users.selected).toBeNull();
  });
});
