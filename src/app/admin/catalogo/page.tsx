import AdminCatalogClient from "@/modules/admin/components/AdminCatalogClient";
import { isAdminAuthenticated } from "@/server/auth/admin-session";

export default async function AdminCatalogPage() {
  const initialAuthenticated = await isAdminAuthenticated();

  return <AdminCatalogClient initialAuthenticated={initialAuthenticated} />;
}
