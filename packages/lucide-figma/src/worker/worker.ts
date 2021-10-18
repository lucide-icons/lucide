// const iconUrl = "https://api.github.com/repos/lucide-icons/lucide/git/trees/1ce345619b77d5dee7e37317cfe1a821ddc15ead"
// const siteUrl = "https://lucide.dev/_next/data/MpPb-i2hAAeVorNzooe5_/index.json"

// let iconData: any = []

// const fetchIconList = async () => {
//   //@ts-ignore
//   const icons = await import('https://unpkg.com/lucide@0.16.10/dist/esm/lucide.js')

//   console.log(icons);

//   // Vercel site
//   // await fetch(siteUrl)
//   //   .then(r => r.json())
//   //   .then(d => {
//   //     iconData = d.pageProps.data
//   //     parent.pluginMessage({
//   //       pluginMessage: {
//   //         type: "iconListResponse",
//   //         iconList: iconData.map(i => {
//   //           return i.name
//   //         })
//   //       }
//   //     })
//   //   })
//   // Github api
//   // await fetch(iconUrl)
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     iconData = data.tree
//       // parent.postMessage({
//       //   pluginMessage: {
//       //     type: "iconListReponse",
//       //     iconList: iconData.map(i => {
//       //         return i.path.replace('.svg','')
//       //       })
//       //   }
//       // }, "*")
//   //   }
//   // )
//   const list: any = [];
//   console.log(list);

//   parent.postMessage({
//     pluginMessage: {
//       type: "iconList",
//       iconList: ['hello']
//     }
//   }, "*")
// }

// const sendIcon = async (name :string) => {

//   let url = iconData.filter((icon: any) => icon.path === `${name}.svg`)[0].url

//   await fetch(url)
//     .then(r => r.json())
//     .then(s => parent.postMessage({
//       pluginMessage: {
//         type: "iconResponse",
//         name: name,
//         svg: atob(s.content)
//       }
//     }, "*")
//   )
// }

// window.onmessage = async (event) => {
//   console.log(event?.data?.pluginMessage, 'worker');
//   if (!event?.data?.pluginMessage) {
//     return
//   }

//   const { pluginMessage } = event.data

//   switch (pluginMessage.type) {
//     case "fetchIcons":
//       fetchIconList()
//       break;
//     case "getIconList":
//       fetchIconList()
//       break;

//     default:
//       break;
//   }
// }

console.log('Hello world!')
