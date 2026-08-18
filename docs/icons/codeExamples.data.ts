import createCodeExamples from '../.vitepress/lib/codeExamples/createCodeExamples';

export default {
  async load() {
    const codeExamples = await createCodeExamples();

    return {
      codeExamples,
    };
  },
};
