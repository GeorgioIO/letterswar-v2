import CustomTable from "../../components/UI/Dashboard/CustomTable/CustomTable";
import PageHeader from "../../components/UI/Dashboard/PageHeader";
import {
  getAllAdminsRequest,
  deleteAdminRequest,
  createAdminRequest,
} from "../../api/admins.api";
import { Shield, ShieldCheck } from "lucide-react";
import AddAdminModal from "../../components/UI/Modals/AddAdminModal";
import { useModal } from "../../hooks/useModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import DeleteModal from "../../components/UI/Modals/DeleteModal";
import { queryClient } from "../../util/tanstack";
import { useToast } from "../../hooks/useToast";
const tableColumns = ["Username", "Email", "Role", "Created At", "Action"];

export default function AdminsPage() {
  const addModal = useModal();
  const deleteModal = useModal();
  const { showToast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdminsRequest,
  });

  const { mutateAsync: addAdminMutation, isPending: isAdding } = useMutation({
    mutationFn: createAdminRequest,
    onSuccess: () => {
      addModal.close();
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      showToast("Admin is added successfully!", "success");
    },
    onError: () => {
      showToast("Adding Admin Failed!", "fail");
    },
  });

  const { mutate: deleteAdminMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteAdminRequest,
    onSuccess: () => {
      deleteModal.close();
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      showToast("Admin is deleted successfully!", "success");
    },
    onError: () => {
      showToast("Deleting Admin Failed!", "fail");
    },
  });

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
        data={data && data}
        columns={tableColumns}
        isLoading={isLoading}
        isError={isError}
        error={error}
        renderRow={renderAdminRow}
        noDataTitle="No Admins Available"
        noDataMessage="Admins appear here."
        handleOpenDelete={(row) => deleteModal.open(row)}
      />
      <AddAdminModal
        isOpen={addModal.isOpen}
        isAdding={isAdding}
        handleClose={addModal.close}
        onSubmit={addAdminMutation}
      />
      <DeleteModal
        isOpen={deleteModal.isOpen}
        isDeleting={isDeleting}
        handleClose={deleteModal.close}
        title="Delete Admin"
        message="You're going to delete this admin. Are you sure (This action is unrestorable)?"
        onSubmit={() => deleteAdminMutation(deleteModal.data?.id)}
      />
    </section>
  );
}
