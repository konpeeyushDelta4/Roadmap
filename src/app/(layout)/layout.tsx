import Layout from "./components/Layout";

export default function DomailL({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
