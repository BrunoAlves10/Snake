// Class Implementation
export default class CustomResponse {
  constructor(
    public status: string | unknown,
    public message: string | unknown,
    public payload: unknown
  ) {}
}
