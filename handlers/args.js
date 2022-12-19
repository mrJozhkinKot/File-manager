const getArgs = (args) => {
  const [executor, file, ...rest] = args;

  const res = [];

  rest.forEach((arg) => {
    if (arg.match(/^(--username)/)) res.push(arg);
  });

  return res[rest.length - 1].split('=')[1];
};

export { getArgs };
