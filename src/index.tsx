import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles.css";
import "./i18n.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TermsOfUse from "./page/(User)/termsOfUse";
import PrivacyPolicy from "./page/(User)/privacyPolicy";
import LoginPage from "./page/(Admin)/loginPage";
import DashboardPage from "./page/(Admin)/dashboardPage";
import NoAccess from "./page/(Admin)/noaccess";
import InProucation from "./page/(User)/in-proucation";
import AboutUs from "./page/(User)/aboutUs";
import RefreshTokenPage from "./page/(Admin)/refreshTokenPage";
import References from "./page/(Admin)/ReferncesPage/References";
import AddRefernces from "./page/(Admin)/ReferncesPage/add-refernces";
import Page from "./page/(Admin)/organizations-under-bwc/page";
import PublicationIndex from "./page/(Admin)/Publications/Publication";
import NewsIndex from "./page/(Admin)/Publications/News";
import AnalysisIndex from "./page/(Admin)/Publications/Analysis";
import WriterIndex from "./page/(Admin)/writer";
import TaskForceIndex from "./page/(Admin)/task-force";
import Loading from "./components/loading";
import NotFoundPage from "./components/notfoundpage";
import { ReactQueryClientProvider } from "./provider/ReactQueryClientProvider";
import UpdateReferenceForm from "./components/form/update-refernce-form";
import AddEmployee from "./page/(Admin)/task-force/add-employee";
import AddOrg from "./page/(Admin)/organizations-under-bwc/add-org";
import ServicesIndex from "./page/(Admin)/services";
import AddServicesIndex from "./page/(Admin)/services/add-services";
import JobsIndex from "./page/(Admin)/jobs";
import AddJob from "./page/(Admin)/jobs/add-job";
import AddReport from "./page/(Admin)/Reports/add-report";
import AddWriter from "./page/(Admin)/writer/add-writer";
import ReferenceInfo from "./components/view/refernce-info";
import TaskForceInfo from "./components/view/task-force-info";
import OrganizationInfo from "./components/view/organization-info";
import ServicesInfo from "./components/view/services-info";
import WriterInfo from "./components/view/writer-info";
import JobInfo from "./components/view/job-info";
import UpdateWriterForm from "./components/form/update-writer";
import UpdateTaskForce from "./components/form/update-taskforce-form";
import UpdateOrg from "./components/form/update-org";
import JoinUs from "./page/(User)/join-us";
import JobDetails from "./page/(User)/job-details";
import AddPublications from "./components/form/add-publications";
import ReportDetials from "./page/(User)/report-detials";
import ViewPublications from "./components/view/view-publishes";
import PublishDetails from "./page/(User)/publish-details";
import UpdateServicesIndex from "./components/form/update-services";
import Profile from "./page/(Admin)/profile";
import UpdateJobForm from "./components/form/update-job";
import Departments from "./page/(User)/departments";
import AddNews from "./components/form/add-news";
import AddFormAnalysis from "./components/form/add-form-analysis";
import ViewNews from "./components/view/view-news";
import ViewAnalysis from "./components/view/view-analysis";
import UpdatePublications from "./components/form/update-publications";
import UpdateNews from "./components/form/update-news";
import UpdateFormAnalysis from "./components/form/update-analysis";
import PublicationPage from "./page/(User)/publicationPage";
import AnalysisDetails from "./page/(User)/anylis-page";
import NewsDetails from "./page/(User)/new-page";
import ReportIndex from "./page/(Admin)/Reports";
import ViewReportById from "./components/view/report-view";
import ReportPage from "./page/(User)/reportPage";
import UpdateReportsForm from "./components/form/update-reports";
import ArchiveIndex from "./page/(User)/archive";
import ResetPassWordIndex from "./page/(Admin)/reset-password";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUse />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/join-us",
    element: <JoinUs />,
  },
  {
    path: "/job-details/:id",
    element: <JobDetails />,
  },
  {
    path: "/all-publishes",
    element: <PublicationPage />,
  },
  {
    path: "/all-Reports",
    element: <ReportPage />,
  },
  {
    path: "/report-details/:id",
    element: <ReportDetials />,
  },
  {
    path: "/publish-details/:id",
    element: <PublishDetails />,
  },
  {
    path: "/Analysis-details/:id",
    element: <AnalysisDetails />,
  },
  {
    path: "/news-details/:id",
    element: <NewsDetails />,
  },
  {
    path: "/departments",
    element: <Departments />,
  },
  {
    path: "/archives",
    element: <ArchiveIndex />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin-dashboard",
    element: <DashboardPage />,
    children: [
      {
        path: "/admin-dashboard/references",
        element: <References />,
      },

      {
        path: "/admin-dashboard/references/add",
        element: <AddRefernces />,
      },
      {
        path: "/admin-dashboard/references/update/:id",
        element: <UpdateReferenceForm />,
      },
      {
        path: "/admin-dashboard/references/info/:id",
        element: <ReferenceInfo />,
      },
      {
        path: "/admin-dashboard/organization",
        element: <Page />,
      },
      {
        path: "/admin-dashboard/organization/add-org",
        element: <AddOrg />,
      },
      {
        path: "/admin-dashboard/organization/info/:id",
        element: <OrganizationInfo />,
      },
      {
        path: "/admin-dashboard/organization/update/:id",
        element: <UpdateOrg />,
      },
      {
        path: "/admin-dashboard/reports",
        element: <ReportIndex />,
      },
      {
        path: "/admin-dashboard/reports/add-report",
        element: <AddReport />,
      },
      {
        path: "/admin-dashboard/reports/info/:id",
        element: <ViewReportById />,
      },
      {
        path: "/admin-dashboard/reports/update/:id",
        element: <UpdateReportsForm />,
      },
      {
        path: "/admin-dashboard/publications",
        element: <PublicationIndex />,
      },
      {
        path: "/admin-dashboard/update-publications/:id",
        element: <UpdatePublications />,
      },
      {
        path: "/admin-dashboard/news",
        element: <NewsIndex />,
      },
      {
        path: "/admin-dashboard/Add-news",
        element: <AddNews />,
      },
      {
        path: "/admin-dashboard/update-news/:id",
        element: <UpdateNews />,
      },
      {
        path: "/admin-dashboard/view-news/:id",
        element: <ViewNews />,
      },
      {
        path: "/admin-dashboard/analysis",
        element: <AnalysisIndex />,
      },
      {
        path: "/admin-dashboard/add-analysis",
        element: <AddFormAnalysis />,
      },
      {
        path: "/admin-dashboard/update-analysis/:id",
        element: <UpdateFormAnalysis />,
      },
      {
        path: "/admin-dashboard/view-analysis/:id",
        element: <ViewAnalysis />,
      },
      {
        path: "/admin-dashboard/view-publishes/:id",
        element: <ViewPublications />,
      },
      {
        path: "/admin-dashboard/add-publications",
        element: <AddPublications />,
      },

      {
        path: "/admin-dashboard/writer",
        element: <WriterIndex />,
      },
      {
        path: "/admin-dashboard/writer/add-writer",
        element: <AddWriter />,
      },
      {
        path: "/admin-dashboard/writer/update-writer/:id",
        element: <UpdateWriterForm />,
      },
      {
        path: "/admin-dashboard/writer/info/:id",
        element: <WriterInfo />,
      },
      {
        path: "/admin-dashboard/taskforce",
        element: <TaskForceIndex />,
      },
      {
        path: "/admin-dashboard/taskforce/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/admin-dashboard/taskforce/update-employee/:id",
        element: <UpdateTaskForce />,
      },
      {
        path: "/admin-dashboard/taskforce/info/:id",
        element: <TaskForceInfo />,
      },
      {
        path: "/admin-dashboard/services",
        element: <ServicesIndex />,
      },
      {
        path: "/admin-dashboard/services/add-services",
        element: <AddServicesIndex />,
      },
      {
        path: "/admin-dashboard/services/update-services/:id",
        element: <UpdateServicesIndex />,
      },
      {
        path: "/admin-dashboard/services/info/:id",
        element: <ServicesInfo />,
      },
      {
        path: "/admin-dashboard/jobs",
        element: <JobsIndex />,
      },
      {
        path: "/admin-dashboard/jobs/add-job",
        element: <AddJob />,
      },
      {
        path: "/admin-dashboard/jobs/info/:id",
        element: <JobInfo />,
      },
      {
        path: "/admin-dashboard/jobs/update-job/:id",
        element: <UpdateJobForm />,
      },
      {
        path: "/admin-dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/admin-dashboard/reset-password",
        element: <ResetPassWordIndex />,
      },
    ],
  },
  {
    path: "/NoAccess",
    element: <NoAccess />,
  },
  {
    path: "/InProucation",
    element: <InProucation />,
  },
  {
    path: "/RefreshToken",
    element: <RefreshTokenPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/report-detials",
    element: <ReportDetials />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ReactQueryClientProvider>
    <React.StrictMode>
      <React.Suspense fallback={<Loading/>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </React.StrictMode>
  </ReactQueryClientProvider>
);
reportWebVitals();
