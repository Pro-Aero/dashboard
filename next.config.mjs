/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/callback/azure-ad",
        destination: "https://dashboard2.proaero.aero",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
