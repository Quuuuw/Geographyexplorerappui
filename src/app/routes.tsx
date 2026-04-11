import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { MapExplore } from "./pages/MapExplore";
import { LevelMap } from "./pages/LevelMap";
import Filter from "./pages/Filter";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import { QuizResult } from "./pages/QuizResult";
import { DailyChallenge } from "./pages/DailyChallenge";
import { ExploreRoutes } from "./pages/ExploreRoutes";
import { CitySelector } from "./pages/CitySelector";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: MapExplore },
      { path: "levels", Component: LevelMap },
      { path: "filter", Component: Filter },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/quiz/:regionId",
    Component: Quiz,
  },
  {
    path: "/summary/:regionId",
    Component: QuizResult,
  },
  {
    path: "/daily-challenge",
    Component: DailyChallenge,
  },
  {
    path: "/explore-routes",
    Component: ExploreRoutes,
  },
  {
    path: "/cities",
    Component: CitySelector,
  },
]);