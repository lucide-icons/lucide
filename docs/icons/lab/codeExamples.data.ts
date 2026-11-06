import createCodeExamples from '../../.vitepress/lib/codeExamples/createLabCodeExamples.ts';

export default {
  async load() {
    const codeExamples = await createCodeExamples();

    return {
      codeExamples,
    };
  },
};
