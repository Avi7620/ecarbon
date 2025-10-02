/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // this enables static HTML export
  images: { unoptimized: true }, // for <Image /> without server
};

module.exports = nextConfig;
