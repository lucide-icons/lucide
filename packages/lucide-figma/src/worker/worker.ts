import { fetchIcons } from "../api/fetchIcons"

const getLatestIcons = async ({ type, cachedIcons }: any) => {
  console.log('hatsa!', cachedIcons)

  const lucideIcons = await fetchIcons(cachedIcons)
  // console.log(lucideIcons);

  parent.postMessage({
    pluginMessage: {
      type: "latestIcons",
      lucideIcons,
    }
  }, "*")
}

window.onmessage = async (event) => {
  if (!event?.data?.pluginMessage) {
    return
  }

  const { pluginMessage } = event.data

  console.log(event?.data?.pluginMessage, 'worker');


  switch (pluginMessage.type) {
    // case "fetchIcons":
    //   fetchIcon()
    //   break;
    case "getLatestIcons":
      console.log('getLatestIcons');

      getLatestIcons(pluginMessage)
      break;

    default:
      break;
  }
}

console.log('Hello world!')
