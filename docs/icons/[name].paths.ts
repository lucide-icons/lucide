import { getAllData } from "../.vitepress/lib/icons";
import createCodeExamples from "../.vitepress/lib/createCodeExamples";

export default {
  paths: async () => {
    const icons = await getAllData()

    const result = await createCodeExamples('activity')

    const pathsPromises = icons.map(async (iconData, index) => {
      // const codeExamples = await createCodeExamples(iconData.name);

      const params = {
        ...iconData,
        codeExamples: result
      };

      return {
        params,
      }
    })

    return Promise.all(pathsPromises);
  }
}
