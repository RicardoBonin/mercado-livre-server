'use strict';

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
