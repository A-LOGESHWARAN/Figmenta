import { v4 as uuidv4 } from "uuid";

export let bookmarks = [
  {
    id: uuidv4(),
    url: "https://github.com",
    title: "GitHub",
    description: "Code hosting platform",
    tags: ["development", "code"],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    url: "https://react.dev",
    title: "React Docs",
    description: "Official React documentation",
    tags: ["react", "frontend"],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    url: "https://openai.com",
    title: "OpenAI",
    description: "AI research lab",
    tags: ["ai"],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    url: "https://vercel.com",
    title: "Vercel",
    description: "Frontend deployment platform",
    tags: ["deployment"],
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    url: "https://stackoverflow.com",
    title: "StackOverflow",
    description: "Programming Q&A",
    tags: ["programming"],
    createdAt: new Date().toISOString()
  }
];
