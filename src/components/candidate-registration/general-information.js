import React, { useState } from "react";
import styles from "../../styles/general-information.module.css";
import {
  EuiFieldText,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiDatePicker,
} from "@elastic/eui";
import moment from "moment";

function GeneralInformation({ formData, setFormData }) {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date) => {
    setStartDate(date);
    setFormData({ ...formData, dob: date });
  };
  return (
    <form className={styles.container}>
      <EuiFieldText
        placeholder="First & Last name"
        onChange={(event) =>
          setFormData({ ...formData, name: event.target.value })
        }
        value={formData.name}
        name="name"
        autoComplete="on"
      />
      <EuiFieldText
        type="email"
        placeholder="E-mail"
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
        value={formData.email}
        name="email"
        autoComplete="on"
      />
      <EuiFieldNumber
        type="tel"
        placeholder="Phone"
        onChange={(event) =>
          setFormData({ ...formData, phone: event.target.value })
        }
        value={formData.phone}
        name="phone"
        autoComplete="on"
      />
      <EuiDatePicker
        label="Date of Birth"
        onChange={handleChange}
        selected={startDate}
      />
      <EuiFieldPassword
        placeholder="Password"
        type="dual"
        name="password"
        autoComplete="on"
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
      <EuiFieldPassword
        placeholder="Confirm Password"
        type="dual"
        name="password"
        autoComplete="on"
        onChange={(event) =>
          setFormData({ ...formData, confirmPassword: event.target.value })
        }
      />
    </form>
  );
}

export default GeneralInformation;
