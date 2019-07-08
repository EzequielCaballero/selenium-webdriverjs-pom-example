/*
 * FILE CREATED FOR TYPESCRIPT
 * Purpose: to read custom module declarations not available as @types/newModule
 *
 * NOTE: tsc command (part of typescript package) can go to any subfolder to search the types, but ts-node (another package) presents problems.
 *       The solution would be to use a subfolder and define there the custom types, then add a reference to the main folder in tsconfig.json (file)
 *       Example path: typings (folder) -> moduleName (subfolder) -> index.d.ts (file)
 */

declare module "screenshot-desktop";
