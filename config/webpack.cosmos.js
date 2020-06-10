const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const SRC_PATH = path.join(process.cwd(), 'src');

module.exports = config => {
  config.entry = path.join(SRC_PATH, 'index.ts');

  config.module.rules.push({
    test: /\.module.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
      'sass-loader',
    ],
  });
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  });
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
        options: {
          configFileName: 'tsconfig.json',
          exclude: [
            path.join(process.cwd(), 'build'),
            path.join(process.cwd(), 'dist'),
          ],
        },
      },
    ],
  });
  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {from: path.join(SRC_PATH, '**/*.woff'), to: 'fonts'},
        {from: path.join(SRC_PATH, '**/*.woff2'), to: 'fonts'},
        {from: path.join(SRC_PATH, 'assets'), to: 'assets'},
      ],
    })
  );
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  });
  return config;
};
