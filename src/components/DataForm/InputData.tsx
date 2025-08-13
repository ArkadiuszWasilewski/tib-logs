import React, { useState } from "react";
import Alert from "../ui/Alerts/Alert";
import spawnLocations from "../../constants/spawnLocations";
import vocations from "../../constants/vocations";
import { FormState, SpawnLocation, Vocation, ReportData } from "./types/index";
import { useAuth } from "@/context/AuthContext";
import { useReportValidation } from "./hooks/useInputValidation";
import { parseTextData } from "./utils/parseTextData";
import { formatSessionDataNumbers } from "./utils/formatData";

const InputData: React.FC = () => {
  const { validate, error, setError } = useReportValidation();
  const [success, setSuccess] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // State
  const [form, setForm] = useState<FormState>({
    dataSource: "text",
    selectedFile: null,
    reportDescription: "",
    characterVocation: "",
    characterLevel: "",
    characterGear: "",
    currentSpawn: "",
    tempTextInput: "",
  });

  // Handlers
  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Safely access the first file
    setForm((prevForm) => ({
      ...prevForm,
      selectedFile: file,
    }));
    setError(null);
    setSuccess(null);
  };

  const sendDataToServer = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        let sessionData: any;

        if (form.dataSource === "file" && form.selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              if (form.selectedFile?.name.endsWith(".json")) {
                sessionData = JSON.parse(e.target?.result as string);
                sessionData = formatSessionDataNumbers(sessionData);
              } else if (form.selectedFile?.name.endsWith(".txt")) {
                sessionData = parseTextData(e.target?.result as string);
              } else {
                setError("Unsupported file format. Use JSON or TXT.");
                reject(new Error("Unsupported file format."));
                return;
              }
              const validationError = validate(form, sessionData);
              if (validationError) {
                reject(new Error(validationError));
                return;
              }
              sendReport(sessionData, resolve, reject);
            } catch (err) {
              setError("Error parsing file.");
              reject(err);
            }
          };
          reader.onerror = () => {
            setError("Error reading file.");
            reject(new Error("Error reading file."));
          };
          reader.readAsText(form.selectedFile);
        } else if (form.dataSource === "text" && form.tempTextInput) {
          sessionData = parseTextData(form.tempTextInput);
          const validationError = validate(form, sessionData);
          if (validationError) {
            reject(new Error(validationError));
            return;
          }
          sendReport(sessionData, resolve, reject);
        } else {
          setError("Invalid data source or missing input.");
          reject(new Error("Invalid data source or missing input."));
        }
      } catch (err) {
        setError("Error processing data.");
        reject(err);
      }
    });
  };

  const sendReport = async (
    sessionData: any,
    resolve: () => void,
    reject: (reason?: any) => void
  ) => {
    try {
      const idToken = await currentUser?.getIdToken(true);

      let user = "Not registered";
      if (currentUser) {
        user = currentUser?.uid;
      }

      const saveData: ReportData = {
        user,
        sessionData,
        reportDescription: form.reportDescription,
        characterVocation: form.characterVocation,
        characterLevel: parseInt(form.characterLevel),
        characterGear: form.characterGear,
        currentSpawn: form.currentSpawn,
        createdAt: new Date(),
      };

      const API_URL = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${API_URL}/api/test/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to submit data to server.");
        reject(new Error("Server error"));
        return;
      }
      setSuccess("Data submitted successfully!");
      resolve();
    } catch (err) {
      setError("Error submitting data to server.");
      reject(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await sendDataToServer();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Session Data Form
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Data Source and Input */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Data Source
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <input
                        className="form-check-input defaultChecked"
                        type="radio"
                        name="dataSource"
                        id="textSource"
                        value="text"
                        checked={form.dataSource === "text"}
                        onChange={handleFormChange}
                      />
                      Paste session data
                    </label>
                    <label className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dataSource"
                        id="fileSource"
                        value="file"
                        checked={form.dataSource === "file"}
                        onChange={handleFormChange}
                      />
                      JSON File
                    </label>
                  </div>
                </div>

                {form.dataSource === "file" && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Upload JSON File
                    </label>
                    <input
                      type="file"
                      accept=".json"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
                      name="selectedFile"
                      onChange={handleFileChange}
                      disabled={form.dataSource !== "file"}
                    />
                  </div>
                )}

                {form.dataSource === "text" && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Paste your session data
                    </label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                      name="tempTextInput"
                      rows={5}
                      placeholder="Session data: From 2025-01-20, 12:53:16 to 2025-01-20, 17:14:11\n\n..."
                      value={form.tempTextInput}
                      onChange={handleFormChange}
                      disabled={form.dataSource !== "text"}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Character Information */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Spawn
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="currentSpawn"
                    placeholder="Enter spawn location"
                    value={form.currentSpawn}
                    onChange={handleFormChange}
                    list="spawnOptions"
                  />
                  <datalist id="spawnOptions">
                    {spawnLocations.map((spawn: SpawnLocation) => (
                      <option
                        key={spawn.spawnLocation}
                        value={spawn.spawnLocation}
                      />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Vocation
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="characterVocation"
                    value={form.characterVocation}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a vocation</option>
                    {vocations.map((vocation: Vocation) => (
                      <option key={vocation} value={vocation}>
                        {vocation}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Level
                  </label>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="characterLevel"
                    placeholder="Enter level"
                    value={form.characterLevel}
                    onChange={handleFormChange}
                    min="1"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Gear
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="characterGear"
                    value={form.characterGear}
                    onChange={handleFormChange}
                  >
                    <option value="">Select gear</option>
                    <option value="BIS+">BIS+</option>
                    <option value="BIS">BIS</option>
                    <option value="MID">MID</option>
                    <option value="BUDGET">BUDGET</option>
                    <option value="CHEAP">CHEAP</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Report Description
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="reportDescription"
                    rows={3}
                    placeholder="Enter report description (optional)"
                    value={form.reportDescription}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-6"
              onClick={handleSubmit}
            >
              Submit Data
            </button>
            {error && <Alert>{error}</Alert>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputData;
