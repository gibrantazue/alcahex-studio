import { create } from 'zustand';
import { Agent } from '@/types/agent';
import { ArchiveWithItemCount } from '@/types/archive';
import { ChatModel } from '@/types/chat';

interface AppState {
  agentList: Omit<Agent, "instructions">[];
  archiveList: ArchiveWithItemCount[];
  chatModels: ChatModel[];
  workflowToolList: any[];
  mcpList: any[];
  setAgentList: (agents: Omit<Agent, "instructions">[]) => void;
  setArchiveList: (archives: ArchiveWithItemCount[]) => void;
  setChatModels: (models: ChatModel[]) => void;
  setWorkflowToolList: (tools: any[]) => void;
  setMcpList: (mcps: any[]) => void;
}

export const appStore = create<AppState>((set) => ({
  agentList: [],
  archiveList: [],
  chatModels: [],
  workflowToolList: [],
  mcpList: [],
  setAgentList: (agentList) => set({ agentList }),
  setArchiveList: (archiveList) => set({ archiveList }),
  setChatModels: (chatModels) => set({ chatModels }),
  setWorkflowToolList: (workflowToolList) => set({ workflowToolList }),
  setMcpList: (mcpList) => set({ mcpList }),
}));
