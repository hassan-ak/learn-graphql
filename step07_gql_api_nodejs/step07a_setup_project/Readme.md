# Project Setup

1. Create a new working directory and navigate to the newly created directory

   ```bash
   mkdir step07a_setup_project
   cd step07a_setup_project
   ```

2. Initialize a new Node.js project in the directory

   ```bash
   npm init --yes
   ```

   This will create a `package.json` file

3. Create two sub directories

   ```bash
   mkdir src
   mkdir dist
   ```

4. Update `package.json` with the following

   ```json
   {
       ...
       "main": "dist/index.js",
       "type": "module",
   }
   ```

5. Install dependencies

   ```bash
   npm install graphql
   npm install @apollo/server
   npm install --save-dev nodemon
   npm install --save-dev typescript
   npm install --save-dev @types/node
   ```

6. Create `.gitignore` and write following to it

   ```
   node_modules
   ```

7. Update `package.json` to include following to the script

   ```json
   {
       ...
       "start": "nodemon ./dist/index.js"
   }
   ```

8. Initialize typescript in the project

   ```bash
   tsc --init
   ```

   This will create a `tsconfig.json` file

9. Update `tsconfig.json` with the following

   ```json
   {
       ...
       "target": "ES2020",
       "lib": ["DOM","ES2020"],
       "module": "ESNext",
       "moduleResolution": "Node",
       "rootDirs": ["src"],
       "types": ["node"],
       "outDir": "dist",
   }
   ```

10. Create `src/index.ts` to console a simple hello world message

    ```ts
    console.log("Hello World!");
    ```

11. Now create javascript files based on the typescript file we just created.

    ```bash
    tsc -w
    ```

12. From a different terminal run the code

    ```bash
    npm start
    ```

13. If every step is followed correctly `Hello World!` will be consoled in the terminal

14. If you are using `VS code` install [Apollo GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo) extension.