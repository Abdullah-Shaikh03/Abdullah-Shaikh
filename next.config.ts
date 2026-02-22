import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, webpack }) => {
    if (dev) {
      config.plugins = config.plugins || [];
      config.plugins.push(
        new webpack.WatchIgnorePlugin({
          paths: [/([\\/]|^)TREE\.md$/],
        })
      );
    }

    return config;
  },
};

export default nextConfig;
