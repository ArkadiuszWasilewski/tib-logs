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
    <section>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="dataSource"
          id="fileSource"
          value="file"
          checked={form.dataSource === "file"}
          onChange={handleFormChange}
        />
        <label className="form-check-label" htmlFor="fileSource">
          JSON File
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="dataSource"
          id="textSource"
          value="text"
          checked={form.dataSource === "text"}
          onChange={handleFormChange}
        />
        <label className="form-check-label" htmlFor="textSource">
          Paste session data
        </label>
      </div>
      <h3>Upload JSON File</h3>
      <input
        type="file"
        accept=".json"
        className="form-control"
        name="selectedFile"
        onChange={handleFormChange}
        disabled={form.dataSource !== "file"}
      />

      <h3>Paste your session data</h3>
      <textarea
        className="form-control mb-2"
        name="tempTextInput"
        rows="5"
        placeholder={
          "Session data: From 2025-01-20, 12:53:16 to 2025-01-20, 17:14:11\n\n..."
        }
        value={form.tempTextInput}
        onChange={handleFormChange}
        disabled={form.dataSource !== "text"}
      ></textarea>

      <h3>Character Class</h3>
      <select
        className="form-select mb-2"
        name="characterVocation"
        value={form.characterVocation}
        onChange={handleFormChange}
      >
        <option value="">Select a vocation</option>
        {vocations.map((vocations) => (
          <option key={vocations} value={vocations}>
            {" "}
            {vocations}{" "}
          </option>
        ))}
      </select>

      <h3>Level</h3>
      <input
        type="number"
        className="form-control mb-2"
        name="characterLevel"
        placeholder="Enter level"
        value={form.characterLevel}
        onChange={handleFormChange}
        min="1"
      />

      <h3>Gear</h3>
      <select
        className="form-select mb-2"
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

      <h3>Spawn</h3>
      <input
        type="text"
        className="form-control mb-2"
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

      <h3>Report Description</h3>
      <textarea
        className="form-control mb-2"
        name="reportDescription"
        rows="3"
        placeholder="Enter report description (optional)"
        value={form.reportDescription}
        onChange={handleFormChange}
      ></textarea>
      <button
        onClick={handleSubmit}
        className="btn btn-primary w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Submit Data
      </button>
      {error && <Alert>{error}</Alert>}
    </section>
  );
};

export default InputData;
