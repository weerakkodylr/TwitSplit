module.exports = {
	setupFiles:['<rootDir>/tests/setup.js'],
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/config/"
    ],
    transform: {
      "^.+\\.js$": "babel-jest"
    },
    moduleFileExtensions: [
      "js",
      "jsx"
    ],
    //collectCoverage: true,
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/tests/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.js"
    }
}