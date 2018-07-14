const SHORTCUTS = [
  { metric: 'Tier', shortcut: 'tier' },
  { metric: 'Business Transaction', shortcut: 'bt' },
  {
    metric: 'Average Response Time (ms)',
    shortcut: 'art',
    formatString: '${v} ms', // eslint-disable-line no-template-curly-in-string
  },
  { metric: 'Calls per Minute', shortcut: 'cpm' },
  { metric: 'Errors per Minute', shortcut: 'epm' },
]

export default sc => SHORTCUTS.find(({ shortcut }) => shortcut === sc)
