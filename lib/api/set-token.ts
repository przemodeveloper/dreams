export const setToken = async (authToken: string) => {
  await fetch("/api/set-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authToken }),
  });
};

export const deleteToken = async () => {
  await fetch("/api/set-token", {
    method: "DELETE",
  });
};
