## Micro-frontend Todo List

### Requeriments

- Node v20.12.0
- Npm 10.5.0


### Commands
`npm run dev` To run the project at port port 5000 so you can go to http://localhost:5000
`npm run test` To run the tests
`npm run build` To build the microfrontend
`npm run serve` To run the build of the microfrontend



### Micro-frontend integration (React-TS Vite APP)
1. Build the microfrontend app with `npm run build`
2. Serve you microfrontend app with `npm run serve`
3. You need to add the following config into your React TS Vite Config
**vite.config.ts**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from 'vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        todo_app: 'http://localhost:5000/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});
```
## How to use the micro-frontend
```typescript
import React, { Suspense } from 'react';
const TodoList = React.lazy(() => import('todo_app/TodoList'));

const App: React.FC = () => {
  return (
    <div>
      <h1>Microfrontend Todo List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList />
      </Suspense>
    </div>
  );
};

export default App;
```


Voilá you're all set ! 


