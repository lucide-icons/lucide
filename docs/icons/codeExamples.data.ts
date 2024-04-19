import createCodeExamples from '../.vitepress/lib/createCodeExamples';

export default {
  async load() {
    const codeExamples = await createCodeExamples();

    // const randomIcons = Array.from({ length: 200 }, () => getRandomItem(icons))

    return {
      codeExamples,
    };
  },
};
