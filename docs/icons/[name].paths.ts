import { getAllData } from "../.vitepress/lib/icons";

export default {
  paths: async () => {
    const icons = await getAllData()

    return icons.map((iconData, index) => {
      const params = {
        ...iconData,
      };

      return {
        params,
      }
    })
  }
}
