export interface WaitlistProduct {
  /** Sent to the API as `product` and to analytics. */
  id: string;
  path: string;
  name: string;
  titlePrefix: string;
  titleAccent: string;
  badge: string;
  subtitle: string;
  cardDescription: string;
  useCaseLabel: string;
  useCasePlaceholder: string;
  survey: {
    expectationsLabel: string;
    features: string[];
  };
}

export const waitlistProducts: Record<string, WaitlistProduct> = {
  mcp: {
    id: 'mcp',
    path: '/mcp',
    name: 'Lucide MCP',
    titlePrefix: 'Lucide',
    titleAccent: 'MCP',
    badge: 'SOON',
    subtitle:
      'An MCP server that lets your coding agent search every Lucide icon and write the code for the framework you already use.',
    cardDescription: "You'll get one email to confirm, then launch updates for Lucide MCP only.",
    useCaseLabel: 'Which AI tool would you use it with?',
    useCasePlaceholder: 'e.g. Claude Code, Cursor, Copilot',
    survey: {
      expectationsLabel: 'What would you want the MCP to do for you?',
      features: [
        'Icon search',
        'Inserting the right import',
        'Framework-specific code',
        'Generating icon sets',
      ],
    },
  },
};

export const iconFrequencies = ['Daily', 'Weekly', 'Monthly', 'Rarely'];
