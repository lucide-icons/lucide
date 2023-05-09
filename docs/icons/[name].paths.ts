import { getAllData } from "../.vitepress/lib/icons";

export default {
  paths: async () => {
    const icons = await getAllData()

    return icons.map((params) => {
      return {
        params,
      }
    })
  }
}
