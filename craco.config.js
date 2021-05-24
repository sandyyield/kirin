const CracoLessPlugin = require('craco-less');
const { getThemeVariables } = require('antd/dist/theme');

module.exports = {
    plugins: [
        //配置 babel-plugin-import
        // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        // modifyVars: { '@primary-color': '#1DA57A' },
                        modifyVars: getThemeVariables({
                            dark: true
                        }),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};