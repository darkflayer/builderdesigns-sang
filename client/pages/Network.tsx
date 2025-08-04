import Layout from "@/components/Layout";
import PlaceholderPage from "@/components/PlaceholderPage";

export default function Network() {
  return (
    <Layout searchQuery="" onSearchChange={() => {}}>
      <PlaceholderPage
        title="My Network"
        description="Connect with people you've met at events and build your professional network."
      />
    </Layout>
  );
}
