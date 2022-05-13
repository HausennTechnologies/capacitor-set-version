export default interface JsonError {
  status: string;
  message: string;
  code?: string;
  sugestions?: string[];
}
