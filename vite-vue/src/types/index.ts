/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export interface ProjectProps {
  id: string;
  appId: string;
  projectName: string;
  projectPath: string;
  enginePath: string;
  projectType: string;
  device: DeviceProps;
  createdAt: Date;
  updatedAt: Date;
  simulationVisible: boolean;
  editorVisible: boolean;
  devtoolVisible: boolean;
  scale: number;
}

export interface DeviceProps {
  value: string;
  label: string;
  screenWidth: number;
  screenHeight: number;
  winWidth: number;
  winHeight: number;
  padding: number[];
  statusHeight: number;
  borderRadius: string;
  frame: string;
  statusBarType: string;
}

export interface ScaleProps {
  value: number;
  label: string;
}

export interface ConversationProps {
  id: number;
  title: string;
  selectedModel: string;
  createdAt: string;
  updatedAt: string;
  providerId: number;
}
export interface ProviderProps {
  id: number;
  name: string;
  title?: string;
  desc?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  models: string[];
}
export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error';

export interface MessageProps {
  id: number;
  content: string;
  type: 'question' | 'answer';
  conversationId: number;
  status?: MessageStatus;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
}

export interface ChatMessageProps {
  role: string;
  content: string;
  imagePath?: string;
}
export interface CreateChatProps {
  messages: ChatMessageProps[];
  providerName: string;
  selectedModel: string;
  messageId: number;
}

export interface UpdatgedStreamData {
  messageId: number;
  data: {
    is_end: boolean;
    result: string;
    is_error?: boolean;
  };
}
export type OnUpdatedCallback = (data: UpdatgedStreamData) => void;

export interface MessageListInstance {
  ref: HTMLDivElement;
}

export interface UniversalChunkProps {
  is_end: boolean;
  result: string;
}

export interface BaiduChunkProps {
  is_end: boolean;
  result: string;
}

export interface AppConfig {
  language: 'zh' | 'en';
  fontSize: number;
  providerConfigs: Record<string, Record<string, string>>;
}

export const DEFAULT_CONFIG: AppConfig = {
  language: 'zh',
  fontSize: 14,
  providerConfigs: {}
};
