import createCodeExamples from '../.vitepress/lib/codeExamples/createCodeExamples.ts';

export default {
  async load() {
    const codeExamples = await createCodeExamples();

    return {
      codeExamples,
    };
  },
};
