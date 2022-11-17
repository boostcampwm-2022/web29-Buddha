import path from 'path';

module.exports = {
  // webpack alias 추가
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      'components': path.resolve(__dirname, 'src/components/'),
      'containers': path.resolve(__dirname, 'src/containers/'),
      'hooks': path.resolve(__dirname, 'src/hooks/'),
      'pages': path.resolve(__dirname, 'src/pages/'),
      'types': path.resolve(__dirname, 'src/types/'),
      'utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  // jest alias 추가
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^containers/(.*)$': '<rootDir>/src/containers/$1',
        '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^pages/(.*)$': '<rootDir>/src/pages/$1',
        '^types/(.*)$': '<rootDir>/src/types/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^axios$': require.resolve('axios'),
      },
    },
  },
};
