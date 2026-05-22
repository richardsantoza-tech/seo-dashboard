import { MOCK_SCAN } from "./mock-data";
import type { Scan } from "./types";

export async function createScan(url: string): Promise<string> {
  void url;
  return MOCK_SCAN.id;
}

export async function getScan(id: string): Promise<Scan> {
  void id;
  return MOCK_SCAN;
}
