
import Dashboard from "views/Dashboard.js";
import Subject from "views/Subjects.js";


var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/subject/english",
    name: "English",
    icon: "education_hat",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/mathematics",
    name: "Mathematics",
    icon: "location_world",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/socialstudies",
    name: "Social Studies",
    icon: "business_globe",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/science",
    name: "Integrated Science",
    icon: "objects_spaceship",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/physics",
    name: "Physics",
    icon: "objects_planet",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/biology",
    name: "Biology",
    icon: "sport_user-run",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/chemistry",
    name: "Chemistry",
    icon: "education_atom",
    component: Subject,
    layout: "/admin",
  },
  {
    path: "/subject/emathematics",
    name: "Elective Mathematics",
    icon: "ui-1_send",
    component: Subject,
    layout: "/admin",
  }
];
export default dashRoutes;
