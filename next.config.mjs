/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
        config.externals = [...config.externals, "hnswlib-node"]

        return config
    },
};

export default nextConfig;
