require('dotenv-cra').config() // https://github.com/gsoft-inc/craco/issues/180

const {
  CracoAppLessPlugin,
  CracoOsLessPlugin,
  CracoModuleFederation,
  CracoCompatibility,
  CracoWasm,
  CracoSilence,
  CracoAnalyzer,
} = require('@sentre/craco-plugins')
const CracoTheme = require('./craco-theme')

module.exports = {
  plugins: [
    {
      plugin: CracoModuleFederation,
      options: {
        uniqueName: process.env.REACT_APP_ID,
      },
    },
    // Os style loaders
    {
      plugin: CracoOsLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@ant-prefix': 'sentre',
            },
          },
        },
      },
    },
    // App style loaders
    {
      plugin: CracoAppLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@ant-prefix': process.env.REACT_APP_ID,
            },
          },
        },
      },
    },
    {
      plugin: CracoTheme,
      options: {
        theme: ['light', 'dark'],
        uniqueName: process.env.REACT_APP_ID,
      },
    },
    {
      plugin: CracoCompatibility,
    },
    {
      plugin: CracoWasm,
    },
    {
      plugin: CracoSilence,
    },
    {
      plugin: CracoAnalyzer,
    },
  ],
}
