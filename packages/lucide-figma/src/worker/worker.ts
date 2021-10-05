const iconUrl = "https://api.github.com/repos/lucide-icons/lucide/git/trees/1ce345619b77d5dee7e37317cfe1a821ddc15ead"
const siteUrl = "https://lucide.dev/_next/data/MpPb-i2hAAeVorNzooe5_/index.json"
let iconData: any = []

const sendList = async () => {
  // Vercel site
  // await fetch(siteUrl)
  //   .then(r => r.json())
  //   .then(d => {
  //     iconData = d.pageProps.data
  //     parent.pluginMessage({
  //       pluginMessage: {
  //         type: "iconListResponse",
  //         iconList: iconData.map(i => {
  //           return i.name
  //         })
  //       }
  //     })
  //   })
  // Github api
  await fetch(iconUrl)
    .then(response => response.json())
    .then(data => {
      iconData = data.tree
      parent.postMessage({
        pluginMessage: {
          type: "iconListReponse",
          iconList: iconData.map(i => {
              return i.path.replace('.svg','')
            })
        }
      }, "*")
    }
  )
}

const sendIcon = async (name :string) => {

  let url = iconData.filter(icon => icon.path === `${name}.svg`)[0].url

  await fetch(url)
    .then(r => r.json())
    .then(s => parent.postMessage({
      pluginMessage: {
        type: "iconResponse",
        name: name,
        svg: atob(s.content)
      }
    }, "*")
  )
}

window.onmessage = (event) => {
  if (event.data.pluginMessage.type === "iconListPls") {
    sendList()
  }

  if (event.data.pluginMessage.type === "iconPls") {
    sendIcon(event.data.pluginMessage.icon)
  }
}
