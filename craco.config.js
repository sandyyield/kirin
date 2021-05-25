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
                        modifyVars: getThemeVariables({
                            dark: true //开个暗夜模式 看着帅一点,就是有点太黑了
                        }),
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};