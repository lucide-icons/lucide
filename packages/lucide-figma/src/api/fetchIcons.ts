const fetchIcons = () => new Promise(async (resolve, reject )=> {


  const response = await fetch('https://unpkg.com/lucide-static@latest/package.json')
  const packageJson = await response.json();

  console.log(packageJson);
  // @ts-ignore
  // const savedIcons = await parent.clientStorage.getAsync.(`lucide-icons@${packageJson.version}`)

  parent.postMessage({
    pluginMessage: {
      type: "getCachedIcons",
      version: packageJson.version,
    }
  }, "*")

  parent.onmessage = async (event) => {
    console.log(event);

    // if (event.type === 'message' && event?.data?.pluginMessage.type === 'cachedIcons') {
    //   const { icons } = event?.data?.pluginMessage

    //   if(icons) {
    //     resolve(icons)
    //   }

    //   const iconNodes = await fetch(`https://unpkg.com/lucide-static@${packageJson.version}/icon-nodes.json`)
    //   console.log(iconNodes);
    //   resolve(iconNodes)
    // }
  }

    // const icons = await fetch('https://unpkg.com/lucide-static@latest/icon-nodes.json')
    // const tags = await fetch('https://unpkg.com/lucide-static@latest/tags.json')
    // parent.postMessage({
    //   pluginMessage: {
    //     type: "fetchIcons",
    //   }
    // }, "*")
    // console.log(savedIcons);

    // console.log(await tags.json());

});

export default fetchIcons
