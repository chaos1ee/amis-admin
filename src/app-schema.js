const appSchema = {
  type: 'app',
  brandName: 'Analysis Log',
  logo: '/logo.png',
  header: {
    type: 'flex',
    justify: 'flex-end',
    alignItems: 'center',
    className: 'w-full',
    items: [
      {
        type: 'dropdown-button',
        trigger: 'hover',
        icon: 'fa fa-user',
        label: '语言',
        buttons: [
          {
            type: 'button',
            label: '中文',
            onClick: "console.log(props);",
          },
          {
            type: 'button',
            label: '英文',
          },
        ],
      },
    ],
  },
  api: '/pages/site.json',
}

export default appSchema
