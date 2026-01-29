export const executePiston = async (language: string, version: string, code: string): Promise<string[]> => {
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [{ content: code }],
      }),
    });

    const result = await response.json();

    if (result.run) {
      const logs: string[] = [];
      if (result.run.stdout) logs.push(result.run.stdout);
      if (result.run.stderr) logs.push(`Error: ${result.run.stderr}`);
      if (logs.length === 0 && result.message) logs.push(result.message);

      return logs;
    } else {
      return ["Error: Failed to execute code."];
    }
  } catch (error: any) {
    return [`Error: ${error.message || error}`];
  }
};
