import { AboutPage } from "./pages/aboutPage";
import { ArticlePage } from "./pages/articlePage";
import { HomePage } from "./pages/homePage";
import { SamplePage } from "./pages/samplePage";
import { WorkPage } from "./pages/workPage";

export const routes = [


    {
        path: "/",
        title: "home",
        icon: "home",
        nav: "fixed",
        expose_desktop_nav: true,
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
        bg: "main"

    },
    {
        path: "/projects",
        title: "projects",
        icon: "about",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <WorkPage />,
        bg: "main"

    },
    {
        path: "/sample",
        title: "sample",
        icon: "test",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        element: <SamplePage />,
    bg: "text"

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



  },





]