import NavbarLayout from "@/layouts/NavbarLayout";
import Dashboard from "@/pages/dashboard/Dashboard";

export const getRouteConfig = (props) => {
  const { DASHBOARD_VIEW } = props;

  return [
    {
      path: "/",
      element: NavbarLayout,
      accessible: DASHBOARD_VIEW,
      childrens: [
        {
          path: "/dashboard",
          element: Dashboard,
          accessible: DASHBOARD_VIEW,
        },
        // {
        //   path: "/profile",
        //   element: Profile,
        //   accessible: PROFILE_VIEW,
        // },
      ],
    },
  ];
};
