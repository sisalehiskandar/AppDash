export default [
  {
    title: 'All Applications',
    query: 'SELECT application, health, art, cpm, epm FROM applications',
  },
  {
    title: 'One Application',
    query:
      'SELECT application, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'Some Applications',
    query:
      'SELECT application, health, art, cpm, epm FROM applications WHERE application REGEXP "MyApp1|MyApp2|MyApp3"',
  },
  {
    title: 'All BTs in an App',
    query:
      'SELECT bt, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'Some BTs in an App',
    query:
      'SELECT bt, health, art, cpm, epm FROM applications WHERE application = "MyApp" AND bt REGEXP "MyBT.*"',
  },
  {
    title: 'Some BTs from different Apps',
    query:
      'SELECT bt, health, art, cpm, epm FROM applications WHERE application REGEXP "MyApp1|MyApp2|MyApp3" AND bt REGEXP "Login.*"',
  },
  {
    title: 'All Tiers in an App',
    query:
      'SELECT tier, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'All Nodes in an App',
    query:
      'SELECT node, health, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'All SEs in an App',
    query:
      'SELECT se, art, cpm, epm FROM applications WHERE application = "MyApp"',
  },
  {
    title: 'Some SEs in different Apps',
    query:
      'SELECT se, art, cpm, epm FROM applications WHERE application REGEXP "MyApp" AND se REGEXP "Login.*"',
  },
]
