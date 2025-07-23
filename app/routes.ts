import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("org-home", "routes/org-home.tsx", [
        route("publish", "routes/org-home/publish.tsx"),
        route("members", "routes/org-home/members.tsx")
    ]),
] satisfies RouteConfig;
