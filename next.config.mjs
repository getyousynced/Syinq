/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.giphy.com', 'api.dicebear.com', 'lh3.googleusercontent.com'],
    },
    async headers() {
        return [
            {
                source: '/.well-known/:path*',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/json',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600',
                    },
                ],
            },
            {
                source: '/apple-app-site-association',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/json',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
