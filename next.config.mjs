/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // 静的サイトのエクスポートを有効にする

    // webpack 設定
    webpack: function (config) {
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader",
      });
      return config;
    },
  };
  
  export default nextConfig;