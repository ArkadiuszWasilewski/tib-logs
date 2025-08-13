import { useState } from "react";
import { validateDataStructure, validateForm, validateGameLogic } from "../utils/validateInputData";
import { FormState } from "../types";
import { parseTextData } from "../utils/parseTextData"

export const useReportValidation = () => {
  const [error, setError] = useState<string | null>(null);

  const validate = (form: FormState, sessionData?: any): string | null => {
    // Form validation
    const formError = validateForm(form);
    if (formError) {
      setError(formError);
      return formError;
    }

    // Data structure validation
    let parsedData = sessionData;
    if (form.dataSource === "text" && form.tempTextInput) {
      try {
        parsedData = parseTextData(form.tempTextInput);
      } catch (err) {
        setError("Error parsing text data.");
        return "Error parsing text data.";
      }
    }

    if (parsedData) {
      const dataError = validateDataStructure(parsedData);
      if (dataError) {
        setError(dataError);
        return dataError;
      }

      // Validation based on in-game mechanics (checking that something is possible)
      const logicError = validateGameLogic(parsedData, form);
      if (logicError) {
        setError(logicError);
        return logicError;
      }
    }

    setError(null);
    return null;
  };

  return { validate, error, setError };
}