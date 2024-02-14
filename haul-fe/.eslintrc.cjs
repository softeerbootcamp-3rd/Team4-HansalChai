module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  settings: {
    react: {
      version: "detect" //React의 버전을 자동으로 찾아서 설정
    }
  },
  ignorePatterns: [
    "node_modules/",
    "build/",
    "dist/",
    "dev-dist/",
    '.eslintrc.cjs',
    "TestView.jsx"
  ], //제외할 파일 및 폴더
  rules: {
    "no-console": "off",
    "@typescript-eslint/*": "off",
    "prettier/prettier": "warn",
    "react/prop-types": "off", //props를 사용하기 전 유효성 검사(undefined인지 확인)를 하지 않음
    "no-multi-spaces": "warn", //연속된 공백('..')의 허용 여부
    "no-multiple-empty-lines": "off", //연속된 빈 줄의 허용 여부
    "no-trailing-spaces": "warn", //줄 끝에 공백을 사용하지 않음(;.)
    "no-unused-vars": "warn", //사용하지 않는 변수를 허용하지 않음
    "no-var": "error", //var를 사용하지 않음
    "prefer-const": "warn", //const를 사용함(특히 재할당 하지 않는 변수에 적용)
    "prefer-destructuring": "warn", // 할당을 사용함()
    "prefer-template": "warn", //템플릿 문자열을 사용함(`abc${var}`)
    "react/jsx-uses-react": "off", //react를 import 하지 않음(React17부터는 하지 않아도 문제 없음)
    "react/react-in-jsx-scope": "off", //jsx, tsx 파일에서 항상 import react가 있는지 검사(React17부터는 없어도 문제 없음)
    "react/jsx-uses-vars": "warn", //변수를 선언하면 반드시 사용해야 함
    "react/jsx-no-undef": "warn", //사용하지 않는 JSX 변수를 사용하지 않음
    "react/jsx-no-duplicate-props": "error", //중복된 props를 사용하지 않음
    "react/jsx-key": "error", //반복문으로 jsx 생성 시 key가 반드시 존재해야 함
    "react/jsx-no-comment-textnodes": "error", //textnode에 주석을 사용하지 않음({}나 <> 안에서 사용해야 함)
    "react/no-children-prop": "warn", //children을 props로 사용하지 않음(<div children={}></div> 등으로 사용하지 않음)
    "react/no-deprecated": "error", //deprecated된 메서드를 허용하지 않음
    "react/no-direct-mutation-state": "error", //state는 반드시 setState를 사용해서 수정함
    "react/display-name": "warn", //displayName을 사용하지 않음(forwardRef 등)
    "arrow-body-style": "off", //화살표 함수의 본문을 중괄호로 감싸지 않음 - prettier와 충돌을 방지하기 위해 끔
    "prefer-arrow-callback": "off", //화살표 함수를 사용하지 않음 - prettier와 충돌을 방지하기 위해 끔
    "@typescript-eslint/*": "off",
    "@typescript-eslint/no-unused-vars": "off",
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        /*camelCase - 일반 변수
         *PascaleCase - 상수
         */
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        selector: 'variableLike'
      },
      {
        //camelCase - import 값
        format: ['camelCase', 'PascalCase'],
        selector: 'import'
      },
      {
        //camelCase - 함수 파라미터
        format: ['camelCase'],
        selector: 'parameter'
      },
      {
        /*camelCase - 일반 함수
         *PascaleCase - 컴포넌트
         */
        format: ['camelCase', 'PascalCase'],
        selector: 'function'
      }

    ]
  }
};