module.exports = {
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "semi": 2,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/label-has-for": [ 2, {
      "components": [ "Label" ],
      "required": {
        "every": [ "nesting", "id" ]
      },
      "allowChildren": false
    }]
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "plugins": [
    "react",
    "import",
    "jsx-a11y"
  ]
};