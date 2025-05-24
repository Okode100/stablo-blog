import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./lib/sanity/schemas";
import { projectId, dataset } from "./lib/sanity/config";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { table } from "@sanity/table";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "default",
  title: "Stablo Template",
  basePath: "/studio",
  projectId: projectId,
  dataset: dataset,

  plugins: [
    deskTool(),
    visionTool(),
    unsplashImageAsset(),
    table(),
    codeInput()
  ],

  schema: {
    types: schemaTypes
  }
});
