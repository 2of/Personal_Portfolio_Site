import { DefaultNotFound } from "./pages/404";
// import { AboutPage } from "./pages/aboutPage/aboutPage";
import { ArticlePage } from "./pages/articlePage";
import { ChessPage } from "./pages/chessPage";
import { DeskShiftPage } from "./pages/deskShiftPage";
import { HomePage } from "./pages/homePage";
import { MorePage } from "./pages/morePage";
import { SamplePage } from "./pages/samplePage";
import { WorkPage } from "./pages/workPage";

import AboutPage2 from "./pages/aboutPage";
import { ConvertPage } from "./pages/converterPage";
import { ToolsPage } from "./pages/toolsPage";
import { ReleasesPage } from "./pages/releasesPage";
import { CatPage } from "./pages/cataloguePage";
import { EditorPage } from "./pages/editor/EditorPage";
export const routes = [


    {
        path: "/",
        title: "home",
        icon: "home",
        nav: "fixed",
        expose_desktop_nav: false,
        expose_mobile_nav: true,
        element: <HomePage />

    },
    // {
    //     path: "/about",
    //     title: "about",
    //     icon: "about",
    //     nav: "fixed",
    //     expose_desktop_nav: true,
    //     expose_mobile_nav: true,
    //     element: <AboutPage />,
    //     bg: "main",
    //     scrollOverride: "true"

    // },
  {
        path: "/about",
        title: "about",
        icon: "user",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <AboutPage2 />,
        bg: "main",
        scrollOverride: "true"

    },

     
    {
        path: "/projects",
        title: "projects",
        icon: "portfolio",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <CatPage />,
        bg: "main",
        scrollOverride: "true"

    },  {
        path: "/MonitorMinder",
        title: "deskshift",
        icon: "laptop",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <DeskShiftPage />,
        bg: "main"

    },{
        path: "/more",
        title: "more",
        icon: "columns",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <MorePage />,
        bg: "main"

    },
    {
        path: "/PostEditor",
        title: "DEV - Post Editor",
        icon: "write",
        nav: "fixed",

        element: <EditorPage />,
        bg: "main"

    },
    {
        path: "/sample",
        title: "sample",
        icon: "test",
        nav: "fixed",
        expose_desktop_nav: false,
        expose_mobile_nav: false,
        element: <SamplePage />,
    bg: "main"

    },

      {
        path: "/tools",
        title: "tools",
        icon: "tool",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <ToolsPage />,
        bg: "main",


    },

      {
        path: "/release",
        title: "releases",
        icon: "columns",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <ReleasesPage />,
        bg: "main",


    },

     {
        path: "/convert_svg_tool",
        title: "svg to useful thing",
        icon: "test",
        nav: "fixed",
        expose_desktop_nav: false,
        expose_mobile_nav: false,
        element: <ConvertPage />,
    bg: "main"

    },


      {
    path: "/proj/:projectId",
    title:"Project...",
     icon: "Catalogue",
     nav: "fixed",
     scrollOverride: "true",
             expose_desktop_nav: false,
             expose_mobile_nav: false,

        element: <ArticlePage />,
        bg: "main"



  },    {
    path: "/chess",
    title:"chess",
     icon: "chess",
     nav: "fixed",
             expose_desktop_nav: true,
        expose_mobile_nav: true,

        element: <ChessPage />,
        bg: "main"



  },


   {
    path: "/*",
    title:"Lost",
     icon: "map",
     nav: "fixed",
             expose_desktop_nav: false,
        expose_mobile_nav: false,

        element: <DefaultNotFound />,
        bg: "main"



  },





]