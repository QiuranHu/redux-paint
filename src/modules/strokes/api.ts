export const getProject = (projectId: string) =>
  fetch(`http://localhost:4000/projects/${projectId}`).then((res) =>
    res.json()
  );
