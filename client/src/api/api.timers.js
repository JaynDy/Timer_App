const SERVER_URL = "";

export const getTimers = async () => {
  const response = await fetch(`${SERVER_URL}/timers`);
  return response.json();
};

export const saveTimers = async (timers) => {
  await fetch(`${SERVER_URL}/timers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(timers),
  });
};
