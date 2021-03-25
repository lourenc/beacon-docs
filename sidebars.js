module.exports = {
  docs: [
    {
      type: "category",
      label: "Beacon",
      items: [
        "beacon/introduction",
        "beacon/design-principles",
        "beacon/contributing",
        "beacon/wallets",
      ],
      collapsed: true,
    },
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation", "getting-started/example"],
      collapsed: false,
    },
    {
      type: "category",
      label: "Guides",
      items: [
        "guides/getting-started",
        "guides/read-previous-state",
        "guides/disconnecting-a-wallet",
        "guides/network",
        "guides/simple-contract-call",
        "guides/fa1.2-transfer",
        "guides/fa2-transfer",
      ],
      collapsed: true,
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        "advanced/ui-elements",
        {
          type: "category",
          label: "Flows",
          items: [
            "advanced/flows/connection",
            "advanced/flows/extension-communication",
            "advanced/flows/ledger-extension",
            "advanced/flows/local-mnemonic",
            "advanced/flows/p2p-direct",
            "advanced/flows/p2p-extension",
          ],
          collapsed: true,
        },
      ],
      collapsed: true,
    },
    "FAQ",
    "CHANGELOG",
    {
      type: "link",
      label: "Custom Label", // The label that should be displayed (string).
      href: "https://example.com", // The target URL (string).
    },
  ],
};
