/** @type {import('next').NextConfig} */
const nextConfig = {
    // ⬇追加
    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        })
        return config
    },
    // ⬆追加
}


export default nextConfig;
