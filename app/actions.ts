"use server";
import { actor } from "@/server/auth";
import { propose, decide } from "@/server/service";
export async function requestWorkflow(input: unknown) {
  return propose(await actor("workflow:request"), input);
}
export async function decideWorkflow(id: string, input: unknown) {
  return decide(await actor("approval:decide"), id, input);
}
