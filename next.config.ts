import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuração otimizada para evitar erros de fetch
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configuração de webpack para evitar problemas de HMR
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Adiciona configuração Turbopack vazia para resolver conflito
  turbopack: {},
};

export default nextConfig;
