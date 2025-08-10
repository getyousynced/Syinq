/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.giphy.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh4.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh5.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'lh6.googleusercontent.com',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        // Suppress the warning about dynamic requires in Supabase realtime
        config.ignoreWarnings = [
            {
                module: /node_modules\/@supabase\/realtime-js/,
                message: /Critical dependency: the request of a dependency is an expression/,
            },
        ];
        return config;
    },
};

export default nextConfig;
