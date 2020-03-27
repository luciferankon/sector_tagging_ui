const getLabels = () => {
  const companyName = document.querySelector("#company-name").value;
  const authKey = document.querySelector("#auth-key").value;
  fetch(`https://sector-tagging.appspot.com?companyName=${companyName}`, {
    headers: {
      authorization: `Bearer ${authKey}`
    }
  })
    .then(res => res.json())
    .then(labels => {
      let labelsField = "<ul>";
      labelsField += labels
        .map(label => `<li>${label}<button class="cancel">X</button></li>`)
        .join("");
      labelsField += "</ul>";
      document.querySelector("#labels").innerHTML = labelsField;
      addOnclickToX();
    });
};

const addOnclickToX = () => {
  document.querySelectorAll(".cancel").forEach(x => (x.onclick = remove));
};

const remove = () => {
  const label = event.target.parentElement.firstChild.data;
  event.target.parentElement.remove();
  const companyName = document.querySelector("#company-name").value;
  const authKey = document.querySelector("#auth-key").value;
  fetch("https://sector-tagging.appspot.com/remove", {
    method: "POST",
    mode: "no-cors",
    headers: {
      authorization: `Bearer ${authKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: companyName,
      label: label
    })
  });
};

const setListeners = () => {
  const submitButton = document.querySelector("#submit");
  submitButton.onclick = getLabels;
};

window.onload = setListeners;
