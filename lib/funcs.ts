export const runJavaScript = (code: string): string[] => {
  const logs: string[] = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => logs.push(args.map(arg => String(arg)).join(" "));
  console.error = (...args) => logs.push(`Error: ${args.map(arg => String(arg)).join(" ")}`);
  console.warn = (...args) => logs.push(`Warning: ${args.map(arg => String(arg)).join(" ")}`);

  try {
    // eslint-disable-next-line no-new-func
    const func = new Function(code);
    func();
  } catch (error: Error | any) {
    logs.push(`Error: ${error.message}`);
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }

  return logs;
};