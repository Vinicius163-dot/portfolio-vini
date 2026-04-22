const fs = require("fs");
const deps = ["vite", "react", "react-dom", "framer-motion", "@vitejs/plugin-react-swc", "@types/react", "@types/react-dom", "typescript"];
deps.forEach(d => {
  const exists = fs.existsSync("node_modules/" + d);
  console.log((exists ? "OK" : "MISSING") + " " + d);
});
