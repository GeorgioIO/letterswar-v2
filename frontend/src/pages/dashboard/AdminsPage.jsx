import CustomTable from "../../components/UI/Dashboard/CustomTable/CustomTable";
import PageHeader from "../../components/UI/Dashboard/PageHeader";
import { getAllAdminsRequest } from "../../api/admins.api";
import { useState, useEffect } from "react";
import { Shield, ShieldCheck } from "lucide-react";
import AddAdminModal from "../../components/UI/Modals/AddAdminModal";
import { useModal } from "../../hooks/useModal";
import { useRefresh } from "../../hooks/useRefresh";
const tableColumns = ["Username", "Email", "Role", "Created At", "Action"];

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const addModal = useModal();
  const { refreshKey, handleRefresh } = useRefresh();

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const data = await getAllAdminsRequest();
        setAdmins(data);
      } catch (error) {
        setError(error.response?.data?.message || "Problem fetching admins");
      } finally {
        setIsFetching(false);
      }
    }

    fetchAdmins();
  }, [refreshKey]);

  function renderAdminRow(row) {
    const formattedDate = new Date(row.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return (
      <>
        <div className="text-sm font-semibold text-orange-500">
          {row.username}
        </div>
        <div className="text-sm text-gray-700 truncate pr-4">{row.email}</div>
        <div>
          {row.role === "superadmin" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-500 border border-orange-200">
              <ShieldCheck size={12} />
              Super Admin
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
              <Shield size={12} />
              Admin
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </>
    );
  }
  return (
    <section className="flex flex-col gap-5">
      <PageHeader
        sectionTitle="Admins"
        addText="Add New Admin"
        openAdd={addModal.open}
      />
      <CustomTable
        data={admins}
        columns={tableColumns}
        isFetching={isFetching}
        error={error}
        renderRow={renderAdminRow}
      />
      <AddAdminModal
        isOpen={addModal.isOpen}
        handleClose={addModal.close}
        successMessage="Admin added successfully"
        failMessage="Failed to add admin"
        handleRefresh={handleRefresh}
      />
    </section>
  );
}
