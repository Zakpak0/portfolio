import "server-only";
import fs from "fs";
import path from "path";
const app = path.join(process.cwd(), "app");
export function enumerate_pages(dir = app, list: string[] = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.lstatSync(filePath).isDirectory();
    if (isDirectory) {
      list = enumerate_pages(filePath, list); // Recursively enumerate pages in subdirectories
    } else {
      const page_name = file
        .replace(/\.js$/, "")
        .replace(/\.jsx$/, "")
        .replace(/\.ts$/, "")
        .replace(/\.tsx$/, "");
      if (page_name.includes("-page")) {
        list.push(page_name.replace("-page", ""));
      }
    }
  });
  return list;
}
export function map_pages_to_routes(pages: string[]) {
  const mapped_routes = pages.reduce(function (map, page) {
    const segments = page.split("-");
    if (segments.length == 1) {
      if (map["/"]) {
        map["/"].push(segments[0]);
        return map;
      } else {
        map["/"] = [segments[0]];
        return map;
      }
    } else {
      const route = segments[0];
      if (map[route]) {
        map[route].push(segments.slice(1).join("/"));
        return map;
      } else {
        map[route] = [segments.slice(1).join("/")];
        return map;
      }
    }
  }, {} as Record<string, string[]>);
  return mapped_routes;
}

export const fields = (function () {
  const pages = enumerate_pages();
  const routes = map_pages_to_routes(pages);
  return Object.entries(routes).sort();
})();
