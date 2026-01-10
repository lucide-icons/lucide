import createCodeExamples from '../../.vitepress/lib/codeExamples/createLabCodeExamples';

export default {
  async load() {
    const codeExamples = await createCodeExamples();

    return {
      codeExamples,
    };
  },
};
