# achivify
### Setting up a json server 
`npx json-server --watch db.json --port 8000`

### Starting a projects
`npm start`

### Why changing the approach to fuctional components, making this branch obsolete?
Initially, I have desided to try to write an app using React and class based components. Why didi I chose this way? Because I was working on a project which used class based components for 5 years, and I just wanted to try the same approach in a new wrapping (React). later on a decided to use ContextAPI (goes inside the box with react) and react-router for roating, this is where the problems started. I can't use react hooks, and class based components at the same time. Yes, I still can use <Navigate> in .jsx, same as I can use <Routes>. But, I can redirect programmatically using 'redirect', it just doesn't work, same with 'navigate', same with catching current route in more sofisticated way than 'window.location'. So as list of "I can't do this I can't do that I need anothe hack" grew, I decided to start from the beginning and rewrite this code I have to functional components + react hooks + ContextAPI. 
