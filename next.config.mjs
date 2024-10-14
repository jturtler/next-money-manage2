/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
    }
};

export default nextConfig;
