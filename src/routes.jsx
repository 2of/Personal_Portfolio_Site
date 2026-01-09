import { DefaultNotFound } from "./pages/404";
import { AboutPage } from "./pages/aboutPage";
import { ArticlePage } from "./pages/articlePage";
import { ChessPage } from "./pages/chessPage";
import { DeskShiftPage } from "./pages/deskShiftPage";
import { HomePage } from "./pages/homePage";
import { MorePage } from "./pages/morePage";
import { SamplePage } from "./pages/samplePage";
import { WorkPage } from "./pages/workPage";

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
    {
        path: "/about",
        title: "about",
        icon: "about",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <AboutPage />,
        bg: "main",
        scrollOverride: "true"

    },

     
    {
        path: "/projects",
        title: "projects",
        icon: "about",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <WorkPage />,
        bg: "main",
        scrollOverride: "true"

    },  {
        path: "/MonitorMinder",
        title: "deskshift",
        icon: "about",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <DeskShiftPage />,
        bg: "main"

    },{
        path: "/more",
        title: "more",
        icon: "about",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <MorePage />,
        bg: "main"

    },
    {
        path: "/sample",
        title: "sample",
        icon: "test",
        nav: "fixed",
        expose_desktop_nav: false,
        expose_mobile_nav: true,
        element: <SamplePage />,
    bg: "main"

    },
      {
    path: "/proj/:projectId",
    title:"Project...",
     icon: "Catalogue",
     nav: "fixed",
             expose_desktop_nav: false,
        expose_mobile_nav: true,

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
        bg: "WTF"



  },


   {
    path: "/*",
    title:"Lost",
     icon: "map",
     nav: "fixed",
             expose_desktop_nav: false,
        expose_mobile_nav: true,

        element: <DefaultNotFound />,
        bg: "main"



  },





]