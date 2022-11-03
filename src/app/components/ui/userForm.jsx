import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserForm = ({ userId }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [qualities, setQualities] = useState([]);
  const [professions, setProfession] = useState([]);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    if (qualities.length > 0) {
      const qualitiesArray = [];
      for (const elem of elements) {
        for (const quality in qualities) {
          if (elem.value === qualities[quality].value) {
            qualitiesArray.push({
              _id: qualities[quality].value,
              name: qualities[quality].label,
              color: qualities[quality].color
            });
          }
        }
      }
      return qualitiesArray;
    }
  };

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      for (const { _id, name, email, profession, sex, qualities } of data) {
        if (_id === userId) {
          const currentQualities = [];
          for (const quality of qualities) {
            currentQualities.push({
              value: quality._id,
              label: quality.name,
              color: quality.color
            });
          }
          setData((prevState) => ({
            ...prevState,
            name,
            email,
            profession: profession._id,
            sex,
            qualities: currentQualities
          }));
        }
      }
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const getDefaultProfession = (professions, id) => {
    if (professions.length > 0) {
      return professions.find((profession) => profession.value === id).label;
    }
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      min: {
        message: "Имя должно состоять минимум из 2 символов",
        value: 2
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    // setData({
    //   ...data,
    //   profession: getProfessionById(profession),
    //   qualities: getQualities(qualities)
    // });

    api.users.update(userId, {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    });
    history.push(`/users/${userId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {data.name ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption={
                  professions &&
                  getDefaultProfession(professions, data.profession)
                }
                options={professions}
                name="profession"
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите ваши качества"
              />
              <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
            </form>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserForm;
