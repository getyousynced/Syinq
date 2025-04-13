class ApiResponse {
  constructor(
    public statusCode: number,
    public data: any,
    public message: string = "Success",
    public success: boolean
  ) {
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
