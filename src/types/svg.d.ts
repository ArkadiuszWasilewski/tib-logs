// src/types/svg.d.ts
declare module "*.svg" {
  const content: string; // For URL imports
  export default content;
}