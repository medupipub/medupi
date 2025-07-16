import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import schemas from './sanity/schemas'; 

const config = defineConfig({
    
    projectId: "m813oo98",
    dataset: "production",
    title: "Medupi Pub",
    apiVersion: "2025-04-30",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: {types: schemas}

})

export default config;