/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'instagram.fcxh3-1.fna.fbcdn.net',
                port: '',
                pathname: '/v/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/id/**',
            },
        ],
    },
};

export default nextConfig;
