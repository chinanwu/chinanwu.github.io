module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(pdf)(\?.*)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "files/[name].[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    }
  }
};
