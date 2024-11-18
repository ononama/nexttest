/** @type {import('next').NextConfig} */
const nextConfig = {
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