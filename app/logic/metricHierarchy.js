export default [
  {
    name: 'Errors'
  },
  {
    name: 'Overall Application Performance'
  },
  {
    name: 'Mobile'
  },
  {
    name: 'Information Points'
  },
  {
    name: 'Application Infrastructure Performance'
  },
  {
    name: 'Business Transaction Performance'
  },
  {
    name: 'End User Experience'
  },
  {
    name: 'Backends',
    type: 'backends',
    children: [
      {
        type: 'backend',
        isName: true,
        children: [
          {
            name: 'Average Response Time (ms)'
          },
          {
            name: 'Calls per Minute'
          },
          {
            name: 'Errors per Minute'
          }
        ]
      }
    ]
  },
  {
    name: 'Service Endpoints'
  }
]
