export default interface ServerError {
  type: string;
  message: string;
  detail?: string;
  title?: string;
}
