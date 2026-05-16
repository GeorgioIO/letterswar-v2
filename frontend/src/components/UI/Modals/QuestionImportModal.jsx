import { useState, useRef } from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import { Import } from "lucide-react";
import Papa from "papaparse";
import ImportTable from "../Dashboard/MiniImportTable/ImportTable";
import Error from "../Error";
import { importQuestionsRequest } from "../../../api/questions.api";
import { useToast } from "../../../hooks/useToast";

const columns = ["Letter", "Question", "Answer"];

export default function QuestionImportModal({
  isOpen,
  handleClose,
  handleRefresh,
}) {
  const [previewData, setPreviewData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInput = useRef();
  const { showToast } = useToast();

  async function handleSubmit() {
    if (previewData.length == 0) return;

    setIsUploading(true);
    setError(null);

    try {
      await importQuestionsRequest({
        questions: JSON.stringify(previewData),
      });

      handleRefresh();
      setPreviewData([]);
      if (fileInput.current) fileInput.current.value = "";
      showToast("Importing data successfull", "success");
    } catch (error) {
      setPreviewData([]);
      setError(error.response?.data?.message);
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputLogic(event) {
    setError(null);
    const file = fileInput.current.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension !== "csv") {
      setError(`Use Only CSV files , ${fileExtension} format is not allowed!`);
    } else {
      // parse file
      parseFile(file);
    }

    if (fileInput) fileInput.current.value = "";
  }

  function parseFile(file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result, file) => {
        setPreviewData(result.data);
      },
      error: (error) => {
        setError(`CSV parsing error: ${error.message}`);
      },
    });
  }

  function renderPreviewRow(row) {
    return (
      <>
        <div className="text-sm text-gray-700 ">{row.letter}</div>
        <div className="text-sm text-gray-700 truncate pr-4">
          {row.question_text}
        </div>
        <div className="text-sm text-gray-700 truncate pr-4">{row.answer}</div>
      </>
    );
  }

  function handleClear() {
    setPreviewData([]);
    setError(null);

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
    >
      <ModalHeader
        title="Bulk Import Questions"
        handleClose={handleClose}
        Icon={Import}
      />
      <ul className="list-disc flex flex-col gap-1">
        <li className="text-gray-400 font-bold text-xs">
          Use only CSV files, other formats are not allowed.
        </li>
        <li className="text-gray-400 font-bold text-xs">
          Follow this pattern for headers: letter,question_text,answer.
        </li>
        <li className="text-gray-400 font-bold text-xs">
          Make sure to not include any comma in your question.
        </li>
      </ul>
      <div className="flex gap-4">
        <input
          type="file"
          ref={fileInput}
          accept=".csv"
          className="hidden"
          id="bulk-file-upload"
          onChange={handleInputLogic}
        />
        <label
          htmlFor="bulk-file-upload"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded cursor-pointer text-sm font-medium transition"
        >
          Select File
        </label>
        <button
          className="cursor-pointer text-base text-black font-black"
          onClick={handleClear}
          type="button"
        >
          Clear
        </button>
      </div>
      {error && <Error errorMessage={error} />}
      {previewData.length > 0 && (
        <>
          <ImportTable
            columns={columns}
            data={previewData}
            renderRow={renderPreviewRow}
          />
          <div className="w-full flex  items-center  gap-5">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded cursor-pointer text-sm font-medium transition"
            >
              {isUploading ? "Importing..." : "Submit"}
            </button>
            <p className="text-base text-gray-400 font-black tracking-tighter">
              Total Rows : {previewData.length}
            </p>
          </div>
        </>
      )}

      {previewData.length > 5 && (
        <p className="p-2 text-center text-xs text-gray-400 bg-gray-50 border-t">
          Showing only first 5 rows
        </p>
      )}
    </Modal>
  );
}
