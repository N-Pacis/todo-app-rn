import path from 'path';
import fs from 'fs';

const logFilePath = path.join(process.cwd(), 'logs.txt');

export const successResponse = (
  message,
  body,
  res
) => {
  return res.status(200).json({
    status: 200,
    message: message,
    data: body,
  });
};

export const errorResponse = (message, res) => {
  return res.status(400).json({
    status: 400,
    message: message,
  });
};

export const notFoundResponse = (
  field,
  value,
  entity,
  res
) => {
  return res.status(404).json({
    status: 404,
    message: entity + ' with ' + field + ' of [' + value + '] not found',
  });
};

export const serverErrorResponse = (ex, res) => {

  const logMessage = `[${new Date().toISOString()}] ${ex}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    res.status(500).json({
      status: 500,
      message: 'Server Error',
      stackTrace: ex,
    });
  });
};
