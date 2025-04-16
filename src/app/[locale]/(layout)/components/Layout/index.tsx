import TopBar from "./TopBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <TopBar />
      {children}
      <ToastContainer
        aria-label="Notifications"
        toastClassName="rounded-2xl"
        hideProgressBar
        theme="light"
      />
    </div>
  );
}
