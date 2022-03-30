export const authenticateUser = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("user")) {
    return true;
  }
  return false;
};

export const displayDevice = () => {
  return fetch("http://localhost:8080/main/display", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const displayDevicebyId = id => {
  return fetch(`http://localhost:8080/main/devices/${id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteDevice = id => {
  return fetch(`http://localhost:8080/main/delete/${id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "DELETE"
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createDevice = device => {
  return fetch("http://localhost:8080/main/device", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(device)
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateDeviceByID = (device, id) => {
  return fetch(`http://localhost:8080/main/update/${id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(device)
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const createUser = user => {
  return fetch("http://localhost:8080/user/add", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(user)
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateUserByID = (user, id) => {
  return fetch(`http://localhost:8080/user/update/${id}`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(user)
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};
export const displayUser = name => {
  return fetch(`http://localhost:8080/user/users/${name}`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const displayCheckedDevice = () => {
  return fetch(`http://localhost:8080/user/checked`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
    .then(data => {
      return data.json();
    })
    .catch(err => {
      console.log(err);
    });
};
