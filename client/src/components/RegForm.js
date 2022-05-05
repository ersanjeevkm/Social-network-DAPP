import { useState } from "react";
import Button from "./Button";
import { createUser } from "../web3/users";

const Input = ({ title, value, onChange }) => (
  <div className="border">
    <label>{title}</label>

    <input value={value} onChange={onChange} />

    <style jsx>{`
      .border {
        border-bottom: 1px solid rgba(0, 0, 0, 0.13);
        margin: 0 -14px;
        padding: 0 14px;
      }
      div:first-of-type {
        border-top: 1px solid rgba(0, 0, 0, 0.13);
      }
      label {
        font-size: 13px;
        color: rgba(81, 81, 112, 0.66);
        text-transform: uppercase;
        display: block;
        margin-top: 8px;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        font-size: 17px;
        padding-top: 8px;
        padding-bottom: 13px;
        border: none;
      }
      input:focus {
        border: none;
        outline: none;
      }
    `}</style>
  </div>
);

export default function RegForm({ onClose }) {
  const [formState, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    gravatarEmail: "",
    bio: "",
  });

  const updateField = (fieldName, e) => {
    formState[fieldName] = e.target.value;

    setForm(formState);
  };

  const createuser = async (e) => {
    e.preventDefault();

    for (let key in formState) {
      if (!formState[key]) {
        return alert(`You must fill in your ${key}!`);
      }
    }

    const { firstName, lastName, username, bio, gravatarEmail } = formState;

    try {
      const res = await createUser(
        username,
        firstName,
        lastName,
        bio,
        gravatarEmail
      );

      if (res.tx !== undefined) alert(`Your user has been created!`);
      else throw res.message;
    } catch (err) {
      alert(`Sorry, we couldn't create your user: ${err}`);
    }

    onClose();
  };

  return (
    <form onSubmit={async (e) => await createuser(e)}>
      <h3>Create your account</h3>

      <Input title="First name" onChange={(e) => updateField("firstName", e)} />

      <Input title="Last name" onChange={(e) => updateField("lastName", e)} />

      <Input
        title="Desired username"
        onChange={(e) => updateField("username", e)}
      />

      <Input
        title="Gravatar email"
        type="email"
        onChange={(e) => updateField("gravatarEmail", e)}
      />

      <Input title="Bio" onChange={(e) => updateField("bio", e)} />

      <footer>
        <Button type="submit">Create</Button>
      </footer>

      <style jsx>{`
        h3 {
          padding-bottom: 10px;
        }
        footer {
          text-align: right;
          padding-top: 16px;
        }
      `}</style>
    </form>
  );
}
