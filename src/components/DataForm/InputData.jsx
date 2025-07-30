import React from "react";
import Alert from "../ui/Alerts/Alert";
import spawnLocations from "../../constants/spawnLocations";
import vocations from "../../constants/vocations";

const InputData = () => {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  //state
  const [form, setForm] = React.useState({
    dataSource: "file",
    selectedFile: "",
    reportDescription: "",
    characterVocation: "",
    characterLevel: "",
    characterGear: "",
    currentSpawn: "",
    tempTextInput: "",
  });

  //handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  //validation
  const validate = () => {
    if (form.dataSource === "file" && !form.selectedFile)
      return "No JSON file selected";
    else if (form.dataSource === "text" && !form.reportDescription)
      return "No session data provided";
    else if (!form.characterVocation) return "Character vocation is required";
    else if (!form.characterLevel) return "Character level is required";
    else if (!form.characterGear) return "Character gear is required";
    else if (!form.currentSpawn) return "Current spawn is required";
  };

  //submit handler
  const handleSubmit = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      console.log("Validation error:", validationError);
      {
        validationError && <Alert>{validationError}</Alert>;
      }
      return;
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-24">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
                    <label className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="dataSource"
                        id="textSource"
                        value="text"
                        checked={form.dataSource === "text"}
                        onChange={handleFormChange}
                      />
                      Paste session data
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
                      onChange={handleFormChange}
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
                      rows="5"
                      placeholder="Session data: From 2025-01-20, 12:53:16 to 2025-01-20, 17:14:11\n\n..."
                      value={form.tempTextInput}
                      onChange={handleFormChange}
                      disabled={form.dataSource !== "text"}
                    ></textarea>
                  </div>
                )}
              </div>

              {/* Right Column: Character Information */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Character Class
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="characterVocation"
                    value={form.characterVocation}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a vocation</option>
                    {vocations.map((vocation) => (
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
                    {spawnLocations.map((spawn) => (
                      <option key={spawn} value={spawn} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Report Description
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                    name="reportDescription"
                    rows="3"
                    placeholder="Enter report description (optional)"
                    value={form.reportDescription}
                    onChange={handleFormChange}
                  ></textarea>
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
