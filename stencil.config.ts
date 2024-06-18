import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import path from 'path';

const getCdnVariable = () => {
  //TODO map other branches here
  const BRANCHES = ['internal-dev', 'internal-test', 'internal-prod', 'customer-dev', 'customer-test', 'customer-prod', 'preview-hotfix', 'hotfix'];
  console.log(BRANCHES);

  const CURRENT_BRANCH = process.env.BRANCH_NAME;

  if (CURRENT_BRANCH && BRANCHES.includes(CURRENT_BRANCH)) {
    console.log(`CURRENT BRANCH: ${CURRENT_BRANCH}`);
    return `src/globals/cdns/${CURRENT_BRANCH}.scss`;
  } else {
    console.log(`DEFAULT internal-dev`);
    return `src/globals/cdns/default.scss`;
  }
};


export const config: Config = {
  namespace: 'blacklist',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
      footer: '* Copyright (c) 2022 bit2win team; *',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: 'components/assets/*', dest: 'assets' },
        { src: 'components/assets/fonts/*', dest: 'fonts' },
      ],
    },
  ],
  globalStyle: 'src/globals/mixin.scss',
  plugins: [
    sass({
      includePaths: [path.join(__dirname, 'src/globals')],
      injectGlobalPaths: ['src/globals/variables.scss', getCdnVariable()],
    }),
  ],
  testing: {
    browserHeadless: "new",
  },
};
