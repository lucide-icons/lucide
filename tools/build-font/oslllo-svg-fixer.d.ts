declare module 'oslllo-svg-fixer' {
  export interface SVGFixerOptions {
    showProgressBar?: boolean;
    traceResolution?: number;
  }

  export default function SVGFixer(
    inputDir: string,
    outputDir: string,
    options?: SVGFixerOptions,
  ): {
    fix: () => Promise<void>;
  };
}
