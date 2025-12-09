// types/index.d.ts

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

// Add any other global types or module declarations here
