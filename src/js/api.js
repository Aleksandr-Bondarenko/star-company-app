const URL = "http://www.mocky.io/v2/5dfcef48310000ee0ed2c281";

export const registerUser = ({ userInfo, setError, toStep }) => {
  const options = {
    method: "POST",
    body: JSON.stringify(userInfo),
  };

  fetch(URL, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else throw new Error(res.statusText);
    })
    .then((data) => {
      const { status, errors } = data;
      if (status === "error") {
        setError(errors[0]);

        switch (errors[0].name) {
          case "age":
            toStep(2);
            break;

          case "location":
            toStep(3);
            break;

          case "email":
            toStep(4);
            break;

          case "password":
            toStep(5);
            break;

          default:
            toStep(1);
        }
      } else {
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
