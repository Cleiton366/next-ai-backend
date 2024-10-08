import Providers from '../entities/providers-models.entity';

export const providers: Providers[] = [
  {
    id: 'SHUTTLE_AI',
    name: 'ShuttleAi',
    url: 'https://api.shuttleai.app/v1/chat/completions',
    documentationUrl: 'https://docs.shuttleai.app/getting-started/introduction',
    models: [
      {
        id: 'shuttle-2-turbo',
        name: 'Shuttle 2 Turbo',
      },
      {
        id: 'gpt-4-turbo-bing',
        name: 'GPT-4 Turbo Bing',
      },
      {
        id: 'claude-instant-1.0',
        name: 'Claude Instant 1.0',
      },
      {
        id: 'dolphin-2.6-mixtral-8x7b',
        name: 'Dolphin 2.6 Mixtral 8x7b',
      },
      {
        id: 'mistral-medium',
        name: 'Mistral Medium',
      },
      {
        id: 'mistral-7b-instruct-v0.1',
        name: 'Mistral 7b Instruct v0.1',
      },
    ],
  },
  {
    id: 'OPEN_ROUTER',
    name: 'Open Router',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    documentationUrl: 'https://openrouter.ai/docs/quick-start',
    models: [
      {
        id: 'mistralai/mistral-7b-instruct:free',
        name: 'Mistral 7b Instruct Free',
      },
      {
        id: 'microsoft/phi-3-medium-128k-instruct:free',
        name: 'Microsoft Phi 3 Medium 128k Instruct Free',
      },
      {
        id: 'meta-llama/llama-3-8b-instruct:free',
        name: 'Meta Llama 3 8b Instruct Free',
      },
      {
        id: 'microsoft/phi-3-mini-128k-instruct:free',
        name: 'Microsoft Phi 3 Mini 128k Instruct Free',
      },
      {
        id: 'google/gemma-2-9b-it:free',
        name: 'Google Gemma 2 9b IT Free',
      },
    ],
  },
  {
    id: 'GROQ',
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    documentationUrl: 'https://console.groq.com/docs/quickstart',
    models: [
      {
        id: 'llama3-8b-8192',
        name: 'Llama3 8b 8192',
      },
      {
        id: 'llama3-70b-8192',
        name: 'Llama3 70b 8192',
      },
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7b',
      },
      {
        id: 'gemma2-9b-it',
        name: 'Gemma2 9b',
      },
    ],
  },
  {
    id: 'AWAN_LLM',
    name: 'Awan LLM',
    url: 'https://api.awanllm.com/v1/chat/completions',
    documentationUrl: 'https://www.awanllm.com/quick-start',
    models: [
      {
        id: 'Meta-Llama-3-8B-Instruct',
        name: 'Meta Llama 3 8B Instruct',
      },
      {
        id: 'Awanllm-Llama-3-8B-Dolfin',
        name: 'Awanllm Llama 3 8B Dolfin',
      },
      {
        id: 'Awanllm-Llama-3-8B-Cumulus',
        name: 'Awanllm Llama 3 8B Cumulus',
      },
      {
        id: 'Meta-Llama-3-70B-Instruct',
        name: 'Meta Llama 3 70B Instruct',
      },
    ],
  },
];
