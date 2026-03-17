const mockChain = {
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  limit: jest.fn().mockResolvedValue({ data: [], error: null }),
  single: jest.fn().mockResolvedValue({ data: null, error: null }),
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockSupabase = { from: jest.fn(() => mockChain) } as any;

import { getAvailableActivities } from "@/lib/agents/conciergeAgent";

describe("conciergeAgent", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns empty array when no activities", async () => {
    mockChain.order.mockResolvedValueOnce({ data: [], error: null });
    const result = await getAvailableActivities(mockSupabase);
    expect(result).toEqual([]);
  });

  it("queries ow_activities table", async () => {
    mockChain.order.mockResolvedValueOnce({ data: [], error: null });
    await getAvailableActivities(mockSupabase);
    expect(mockSupabase.from).toHaveBeenCalledWith("ow_activities");
  });
});
